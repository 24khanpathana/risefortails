import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './FormPages.css';

const SlotBooking = () => {
    const [formData, setFormData] = useState({ name: '', mobile: '', date: '', timeSlot: '' });
    const [message, setMessage] = useState('');
    const timeSlots = ["10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM", "02:00 PM - 03:00 PM", "03:00 PM - 04:00 PM"];
    
    const today = new Date().toISOString().split('T')[0];

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setMessage('');
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/slots/book`, formData);
            setMessage(res.data.message);
            setFormData({ name: '', mobile: '', date: '', timeSlot: '' });
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="form-page-container">
                <div className="form-container card-theme">
                    <h2 className="form-title text-primary-theme">Book a Visit Slot</h2>
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
                            <label>Date</label>
                            <input type="date" name="date" min={today} value={formData.date} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>Time Slot</label>
                            <select name="timeSlot" value={formData.timeSlot} onChange={handleChange} className="form-control" required>
                                <option value="">Select a time slot</option>
                                {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                            </select>
                        </div>
                        <button type="submit" className="button-primary">Book Slot</button>
                    </form>
                    {message && <p className="form-message">{message}</p>}
                </div>
            </div>
        </>
    );
};

export default SlotBooking;