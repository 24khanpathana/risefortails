import React, { useState } from 'react';
import axios from 'axios';

const Donation = () => {
    const [formData, setFormData] = useState({ name: '', mobile: '', amount: '' });
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        // (Keep your existing Razorpay Logic here exactly as it was)
        try {
            const { data: { key } } = { key: process.env.REACT_APP_RAZORPAY_KEY_ID };
            const { data: { id, amount } } = await axios.post(`${process.env.REACT_APP_API_URL}/api/donations/order`, { amount: formData.amount });

            const options = {
                key, amount, currency: "INR", name: "Rise for Tails", description: "Donation for Animal Welfare", order_id: id,
                handler: async function (response) {
                    try {
                        const verifyUrl = `${process.env.REACT_APP_API_URL}/api/donations/verify`;
                        const verificationData = { ...response, name: formData.name, mobile: formData.mobile, amount: formData.amount };
                        const { data } = await axios.post(verifyUrl, verificationData);
                        setMessage({ type: 'success', text: data.message });
                        setFormData({ name: '', mobile: '', amount: '' });
                    } catch (error) { setMessage({ type: 'error', text: "Payment verification failed." }); }
                },
                prefill: { name: formData.name, contact: formData.mobile },
                theme: { color: "#007bff" },
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) { setMessage({ type: 'error', text: "An error occurred. Please try again." }); }
    };

    return (
        <div className="page-container flex justify-center items-center min-h-[calc(100vh-80px)] bg-gray-50 dark:bg-[#0a0a0a]">
            <div className="card w-full max-w-2xl shadow-xl">
                <h2 className="section-title !mb-10 text-center">Make a Donation</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 items-center">
                        <label className="md:text-right font-semibold text-gray-700 dark:text-gray-300">Full Name</label>
                        <div className="md:col-span-2">
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field w-full" placeholder="Enter your name" required />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 items-center">
                        <label className="md:text-right font-semibold text-gray-700 dark:text-gray-300">Mobile No</label>
                        <div className="md:col-span-2">
                            <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="input-field w-full" placeholder="Enter mobile number" required />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 items-center">
                        <label className="md:text-right font-semibold text-gray-700 dark:text-gray-300">Amount (INR)</label>
                        <div className="md:col-span-2 relative">
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">₹</span>
                            <input type="number" name="amount" value={formData.amount} onChange={handleChange} className="input-field w-full pl-8" placeholder="0.00" required min="10" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 pt-4">
                        <div className="hidden md:block"></div>
                        <div className="md:col-span-2">
                            <button type="submit" className="btn-primary w-full shadow-lg">Donate Now</button>
                        </div>
                    </div>
                </form>

                {message.text && (
                    <div className={`mt-6 p-4 rounded-lg text-center font-medium ${message.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                        {message.text}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Donation;