import React, { useState } from 'react';
import axios from 'axios';

const Feedback = () => {
    const [formData, setFormData] = useState({ name: '', email: '', feedback: '' });
    const [message, setMessage] = useState('');

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/feedback`, formData);
            setMessage(res.data.message);
            setFormData({ name: '', email: '', feedback: '' });
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred.');
        }
    };

    return (
        <section id="feedback" className="card-theme">
            <div className="container">
                <h2 className="section-title text-primary-theme">Feedback</h2>
                <div className="form-container">
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
                            <label>Your Feedback</label>
                            <textarea name="feedback" rows="5" value={formData.feedback} onChange={handleChange} className="form-control" required></textarea>
                        </div>
                        <button type="submit" className="button-primary">Submit Feedback</button>
                    </form>
                    {message && <p style={{marginTop: '20px', textAlign: 'center'}}>{message}</p>}
                </div>
            </div>
        </section>
    );
};

export default Feedback;