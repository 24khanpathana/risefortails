import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminDashboard.css';
import Settings from './admin/Settings'; // Import new Settings component

const AdminDashboard = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('slotsToday');
    const [data, setData] = useState({
        slotsToday: [], slotsHistory: [], volunteers: [],
        donations: [], feedback: [], complaints: [],
    });

    const api = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: { Authorization: `Bearer ${token}` }
    });

    useEffect(() => {
        // Fetch data only for the relevant tabs, not settings
        if (activeTab !== 'settings') {
             const fetchData = async () => {
                try {
                    const endpoints = {
                        slotsToday: '/api/slots/today', slotsHistory: '/api/slots', volunteers: '/api/volunteers',
                        donations: '/api/donations', feedback: '/api/feedback', complaints: '/api/complaints',
                    };
                    const res = await api.get(endpoints[activeTab]);
                    setData(prev => ({ ...prev, [activeTab]: res.data }));
                } catch (error) {
                    console.error("Failed to fetch admin data", error);
                    if (error.response?.status === 401) logout();
                }
            };
            fetchData();
        }
    }, [activeTab, token]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    
    const renderTable = (items, headers) => (
        items.length === 0 ? <p>No data available.</p> :
        <div className="table-responsive">
        <table>
            <thead>
                <tr>{Object.keys(headers).map(h => <th key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
                {items.map(item => (
                    <tr key={item._id}>
                        {Object.values(headers).map((key, i) => <td key={i} data-label={Object.keys(headers)[i]}>{item[key]}</td>)}
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
    
    const renderContent = () => {
        switch(activeTab) {
            case 'slotsToday': return renderTable(data.slotsToday, { Name: 'name', Mobile: 'mobile', Date: 'date', 'Time Slot': 'timeSlot' });
            case 'slotsHistory': return renderTable(data.slotsHistory, { Name: 'name', Mobile: 'mobile', Date: 'date', 'Time Slot': 'timeSlot' });
            case 'volunteers': return renderTable(data.volunteers, { Name: 'name', Email: 'email', Mobile: 'mobile', Skills: 'skills' });
            case 'donations': return renderTable(data.donations, { Name: 'name', Mobile: 'mobile', Amount: 'amount', 'Payment ID': 'razorpay_payment_id' });
            case 'feedback': return renderTable(data.feedback, { Name: 'name', Email: 'email', Feedback: 'feedback' });
            case 'complaints': return renderTable(data.complaints, { Name: 'name', Email: 'email', Complaint: 'complaint' });
            case 'settings': return <Settings api={api} />; // Render the Settings component
            default: return null;
        }
    };

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <h2>Admin Panel</h2>
                <nav>
                    <ul>
                        <li onClick={() => setActiveTab('slotsToday')} className={activeTab === 'slotsToday' ? 'active' : ''}>Today’s Bookings</li>
                        <li onClick={() => setActiveTab('slotsHistory')} className={activeTab === 'slotsHistory' ? 'active' : ''}>Booking History</li>
                        <li onClick={() => setActiveTab('volunteers')} className={activeTab === 'volunteers' ? 'active' : ''}>Volunteers</li>
                        <li onClick={() => setActiveTab('donations')} className={activeTab === 'donations' ? 'active' : ''}>Donations</li>
                        <li onClick={() => setActiveTab('feedback')} className={activeTab === 'feedback' ? 'active' : ''}>Feedback</li>
                        <li onClick={() => setActiveTab('complaints')} className={activeTab === 'complaints' ? 'active' : ''}>Complaints</li>
                        <li onClick={() => setActiveTab('settings')} className={activeTab === 'settings' ? 'active' : ''}>Settings</li> {/* New Tab */}
                    </ul>
                </nav>
                <button onClick={handleLogout} className="button-primary logout-btn">Logout</button>
            </aside>
            <main className="main-content">
                <header><h1>Dashboard</h1></header>
                <div className="content-area">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;