import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './FormPages.css';

const AdminLogin = () => {
    const [formData, setFormData] = useState({ adminId: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, formData);
            login(res.data.token);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="form-page-container">
            <div className="form-container card-theme">
                <h2 className="form-title text-primary-theme">Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Admin Email</label>
                        <input type="text" name="adminId" value={formData.adminId} onChange={handleChange} className="form-control" required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" required />
                    </div>
                    <button type="submit" className="button-primary" style={{ marginBottom: '15px' }}>Login</button>
                    <div className="form-group" style={{ textAlign: 'center' }}>
                        <a href="/admin/forgot-password" className="text-primary-theme" style={{ textDecoration: 'none', fontSize: '0.9rem' }}>
                            Forgot Password?
                        </a>
                    </div>
                </form>
                {error && <p className="form-message error">{error}</p>}
            </div>
        </div>
    );
};

export default AdminLogin;