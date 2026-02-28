import React, { useState } from 'react';
import axios from 'axios';

const Volunteer = () => {
    const [formData, setFormData] = useState({ name: '', email: '', mobile: '', skills: '' });
    const [message, setMessage] = useState('');

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/volunteers/apply`, formData);
            setMessage(res.data.message);
            setFormData({ name: '', email: '', mobile: '', skills: '' });
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred.');
        }
    };

    return (
        <section id="volunteer">
            <div className="container">
                <h2 className="section-title text-primary-theme">Apply as a Volunteer</h2>
                <p style={{textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px auto', lineHeight: '1.8'}}>
                    Our volunteers are the backbone of our organization. Whether you can help with on-site animal care, administrative tasks, or event coordination, your time and skills are invaluable. Fill out the form below to join our team and make a difference.
                </p>
                <div className="form-container card-theme">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobile">Mobile Number</label>
                            <input type="tel" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="skills">Skills / Reason for Applying</label>
                            <textarea id="skills" name="skills" rows="4" value={formData.skills} onChange={handleChange} className="form-control" required></textarea>
                        </div>
                        <button type="submit" className="button-primary">Apply as Volunteer</button>
                    </form>
                    {message && <p style={{marginTop: '20px', textAlign: 'center'}}>{message}</p>}
                </div>
            </div>
        </section>
    );
};

export default Volunteer;