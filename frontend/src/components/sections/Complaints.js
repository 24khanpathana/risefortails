import React, { useState } from 'react';
import axios from 'axios';

const Complaints = () => {
    const [formData, setFormData] = useState({ name: '', email: '', complaint: '' });
    const [message, setMessage] = useState('');

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/complaints`, formData);
            setMessage(res.data.message);
            setFormData({ name: '', email: '', complaint: '' });
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred.');
        }
    };

    return (
        <section id="complaints">
            <div className="container">
                <h2 className="section-title text-primary-theme">Complaints</h2>
                <div className="form-container card-theme">
                     <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>Your Complaint</label>
                            <textarea name="complaint" rows="5" value={formData.complaint} onChange={handleChange} className="form-control" required></textarea>
                        </div>
                        <button type="submit" className="button-primary">Submit Complaint</button>
                    </form>
                    {message && <p style={{marginTop: '20px', textAlign: 'center'}}>{message}</p>}
                </div>
            </div>
        </section>
    );
};

export default Complaints;