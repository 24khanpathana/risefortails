import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './FormPages.css';

const AdminLogin = () => {
    // State for the user's ID and password
    const [credentials, setCredentials] = useState({ adminId: '', password: '' });
    // State for the OTP code entered by the user
    const [otp, setOtp] = useState('');
    // State to handle and display errors
    const [error, setError] = useState('');
    // State to display success messages (like "OTP sent")
    const [message, setMessage] = useState('');
    // **KEY STATE**: This boolean controls which form is visible.
    // false = show ID/Password form, true = show OTP form
    const [showOtpForm, setShowOtpForm] = useState(false);
    
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleCredentialChange = e => setCredentials({ ...credentials, [e.target.name]: e.target.value });
    const handleOtpChange = e => setOtp(e.target.value);

    /**
     * Step 1: Handle the initial ID and Password submission.
     */
    const handleLoginSubmit = async e => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            // Send credentials to the backend
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, credentials);
            
            // The backend will respond with `otpRequired: true` if credentials are valid and OTP is on.
            if (res.data.otpRequired) {
                // If server says OTP is required, update state to show the OTP form.
                setMessage(res.data.message);
                setShowOtpForm(true); // This makes the OTP form appear
            } else {
                // If OTP is disabled, log in directly.
                login(res.data.token);
                navigate('/admin/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };
    
    /**
     * Step 2: Handle the OTP submission after the first form is cleared.
     */
    const handleOtpSubmit = async e => {
        e.preventDefault();
        setError('');
        try {
            // Send the adminId and the entered OTP to the verification endpoint.
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/verify-otp`, {
                adminId: credentials.adminId,
                otp
            });
            // On successful OTP verification, get the token and log the user in.
            login(res.data.token);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'OTP verification failed');
        }
    };

    return (
        <div className="form-page-container">
            {/* 
              This is the conditional rendering logic.
              Based on the `showOtpForm` state, it will render ONE of these forms.
            */}
            {!showOtpForm ? (
                // RENDER THIS FORM FIRST (when showOtpForm is false)
                <div className="form-container card-theme">
                    <h2 className="form-title text-primary-theme">Admin Login</h2>
                    <form onSubmit={handleLoginSubmit}>
                        <div className="form-group">
                            <label>Admin ID</label>
                            <input type="text" name="adminId" value={credentials.adminId} onChange={handleCredentialChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" value={credentials.password} onChange={handleCredentialChange} className="form-control" required />
                        </div>
                        <button type="submit" className="button-primary">Login</button>
                    </form>
                    {error && <p className="form-message error">{error}</p>}
                </div>
            ) : (
                // RENDER THIS FORM SECOND (when showOtpForm becomes true)
                <div className="form-container card-theme">
                    <h2 className="form-title text-primary-theme">Enter OTP</h2>
                    {message && <p className="form-message">{message}</p>}
                    <form onSubmit={handleOtpSubmit}>
                        <div className="form-group">
                            <label>4-Digit OTP</label>
                            <input type="text" name="otp" value={otp} onChange={handleOtpChange} className="form-control" required maxLength="4" pattern="\d{4}" title="Please enter a 4-digit number" />
                        </div>
                        <button type="submit" className="button-primary">Verify & Login</button>
                    </form>
                     {error && <p className="form-message error">{error}</p>}
                </div>
            )}
        </div>
    );
};

export default AdminLogin;