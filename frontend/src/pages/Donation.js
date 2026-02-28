import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './FormPages.css';

const Donation = () => {
    const [formData, setFormData] = useState({ name: '', mobile: '', amount: '' });
    const [message, setMessage] = useState('');

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const { data: { key } } = { key: process.env.REACT_APP_RAZORPAY_KEY_ID };
            const { data: { id, amount } } = await axios.post(`${process.env.REACT_APP_API_URL}/api/donations/order`, {
                amount: formData.amount
            });

            const options = {
                key,
                amount,
                currency: "INR",
                name: "Rise for Tails",
                description: "Donation for Animal Welfare",
                order_id: id,
                handler: async function (response) {
                    try {
                        const verifyUrl = `${process.env.REACT_APP_API_URL}/api/donations/verify`;
                        const verificationData = {
                            ...response,
                            name: formData.name,
                            mobile: formData.mobile,
                            amount: formData.amount,
                        };
                        const { data } = await axios.post(verifyUrl, verificationData);
                        setMessage(data.message);
                        setFormData({ name: '', mobile: '', amount: '' });
                    } catch (error) {
                        setMessage("Payment verification failed.");
                    }
                },
                prefill: {
                    name: formData.name,
                    contact: formData.mobile,
                },
                notes: {
                    address: "Rise for Tails NGO",
                },
                theme: {
                    color: "#007bff",
                },
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            setMessage("An error occurred. Please try again.");
            console.error(error);
        }
    };


    return (
        <>
            <Navbar />
            <div className="form-page-container">
                <div className="form-container card-theme">
                    <h2 className="form-title text-primary-theme">Make a Donation</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>Mobile Number</label>
                            <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>Donation Amount (INR)</label>
                            <input type="number" name="amount" value={formData.amount} onChange={handleChange} className="form-control" required min="10" />
                        </div>
                        <button type="submit" className="button-primary">Donate Now</button>
                    </form>
                    {message && <p className="form-message">{message}</p>}
                </div>
            </div>
        </>
    );
};

export default Donation;