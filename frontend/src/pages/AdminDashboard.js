import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate(); // For redirecting to home
    const [activeTab, setActiveTab] = useState('content');
    const [selectedPage, setSelectedPage] = useState('Home');
    
    // Data states
    const [contents, setContents] = useState([]);
    const [animals, setAnimals] = useState([]);
    const [overviewData, setOverviewData] = useState({ slots: [], volunteers: [], donations: [], feedback: [], complaints:[] });
    
    // Shared Form States
    const [editingId, setEditingId] = useState(null);
    
    // Content Form
    const [formData, setFormData] = useState({ title: '', description: '', imageUrl: '', date: '', role: '' });
    const [customFields, setCustomFields] = useState([]);
    const [addCustomForm, setAddCustomForm] = useState(false);

    // Animal Form
    const [animalData, setAnimalData] = useState({ name: '', breed: '', age: '', gender: 'Male', location: '', description: '', imageUrl: '' });

    const api = axios.create({ baseURL: process.env.REACT_APP_API_URL, headers: { Authorization: `Bearer ${token}` } });

    const fetchAllData = async () => {
        try {
            const[contentRes, animalRes, slotsRes, volRes, donRes, feedRes, compRes] = await Promise.all([
                api.get('/api/content'), api.get('/api/animals'), api.get('/api/slots'), api.get('/api/volunteers'), api.get('/api/donations'), api.get('/api/feedback'), api.get('/api/complaints')
            ]);
            setContents(contentRes.data);
            setAnimals(animalRes.data);
            setOverviewData({ slots: slotsRes.data, volunteers: volRes.data, donations: donRes.data, feedback: feedRes.data, complaints: compRes.data });
        } catch (error) { if (error.response?.status === 401) handleLogout(); }
    };

    useEffect(() => { fetchAllData(); }, [token]);

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to Home Page
    };

    // --- Content Handlers ---
    const handleContentSubmit = async (e) => {
        e.preventDefault();
        const payload = { ...formData, page: selectedPage };
        if (addCustomForm && selectedPage === 'Service') payload.customForm = { title: formData.title, fields: customFields };
        
        try {
            if (editingId) await api.put(`/api/content/${editingId}`, payload);
            else await api.post('/api/content', payload);
            setFormData({ title: '', description: '', imageUrl: '', date: '', role: '' });
            setCustomFields([]); setAddCustomForm(false); setEditingId(null);
            fetchAllData();
        } catch (error) { alert('Error saving content'); }
    };

    const editContentItem = (item) => {
        setEditingId(item._id);
        setFormData({ title: item.title, description: item.description, imageUrl: item.imageUrl, date: item.date ? item.date.split('T')[0] : '', role: item.role || '' });
    };

    // --- Animal Handlers ---
    const handleAnimalSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) await api.put(`/api/animals/${editingId}`, animalData);
            else await api.post('/api/animals', animalData);
            
            setAnimalData({ name: '', breed: '', age: '', gender: 'Male', location: '', description: '', imageUrl: '' });
            setEditingId(null);
            fetchAllData();
        } catch (error) { alert('Error saving animal'); }
    };

    const editAnimal = (item) => {
        setEditingId(item._id);
        setAnimalData(item);
    };

    const handleDelete = async (id, type) => {
        if(window.confirm('Delete this item?')) {
            await api.delete(`/api/${type}/${id}`);
            fetchAllData();
        }
    };

    // --- Renderers ---
    const renderTable = (items, headers) => (
        <div className="admin-table-wrapper">
            <table className="admin-table">
                <thead><tr>{Object.keys(headers).map(h => <th key={h}>{h}</th>)}</tr></thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item._id}>
                            {Object.keys(headers).map(key => <td key={key}>{item[headers[key]]}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderAnimalManager = () => (
        <div className="card">
            <h2 style={{color: 'var(--primary-light)', marginBottom: '20px'}}>Adoption Animals</h2>
            
            <div className="admin-form-box">
                <h3 style={{marginBottom: '20px'}}>{editingId ? 'Edit Animal' : 'Add New Animal'}</h3>
                <form onSubmit={handleAnimalSubmit}>
                    <div className="grid-container grid-2">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" required value={animalData.name} onChange={e => setAnimalData({...animalData, name: e.target.value})} />
                        </div>
                        <div className="form-group">
                            <label>Breed</label>
                            <input type="text" className="form-control" value={animalData.breed} onChange={e => setAnimalData({...animalData, breed: e.target.value})} />
                        </div>
                        <div className="form-group">
                            <label>Age (e.g., 2 Months, 3 Years)</label>
                            <input type="text" className="form-control" value={animalData.age} onChange={e => setAnimalData({...animalData, age: e.target.value})} />
                        </div>
                        <div className="form-group">
                            <label>Gender</label>
                            <select className="form-control" value={animalData.gender} onChange={e => setAnimalData({...animalData, gender: e.target.value})}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <input type="text" className="form-control" value={animalData.location} onChange={e => setAnimalData({...animalData, location: e.target.value})} />
                        </div>
                        <div className="form-group">
                            <label>Image URL</label>
                            <input type="text" className="form-control" value={animalData.imageUrl} onChange={e => setAnimalData({...animalData, imageUrl: e.target.value})} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Description / Personality</label>
                        <textarea className="form-control" rows="3" value={animalData.description} onChange={e => setAnimalData({...animalData, description: e.target.value})}></textarea>
                    </div>
                    <button type="submit" className="button-primary" style={{marginTop: '10px'}}>{editingId ? 'Update' : 'Save'} Animal</button>
                    {editingId && <button type="button" onClick={() => {setEditingId(null); setAnimalData({ name: '', breed: '', age: '', gender: 'Male', location: '', description: '', imageUrl: '' })}} className="button-primary" style={{marginTop: '10px', marginLeft: '10px', backgroundColor: 'var(--secondary-light)'}}>Cancel Edit</button>}
                </form>
            </div>

            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead><tr><th>Image</th><th>Name</th><th>Breed/Age</th><th>Actions</th></tr></thead>
                    <tbody>
                        {animals.map(item => (
                            <tr key={item._id}>
                                <td><img src={item.imageUrl} alt={item.name} style={{width:'50px', height:'50px', objectFit:'cover', borderRadius:'5px'}}/></td>
                                <td>{item.name} ({item.gender})</td>
                                <td>{item.breed} | {item.age}</td>
                                <td>
                                    <button onClick={() => editAnimal(item)} className="action-btn edit">✎ Edit</button>
                                    <button onClick={() => handleDelete(item._id, 'animals')} className="action-btn delete">🗑 Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderContentManager = () => (
        <div className="card">
            <h2 style={{color: 'var(--primary-light)', marginBottom: '20px'}}>Content Manager</h2>
            <div className="form-group">
                <label>Select Page to Manage</label>
                <select value={selectedPage} onChange={e => { setSelectedPage(e.target.value); setEditingId(null); setAddCustomForm(false); }} className="form-control" style={{maxWidth: '300px'}}>
                    {['Home', 'About', 'Team', 'Event', 'Service', 'Contact', 'Gallery'].map(p => <option key={p} value={p}>{p}</option>)}
                </select>
            </div>

            <div className="admin-form-box">
                <h3 style={{marginBottom: '20px'}}>{editingId ? 'Edit Item' : `Add New to ${selectedPage}`}</h3>
                <form onSubmit={handleContentSubmit}>
                    <div className="grid-container grid-2">
                        <div className="form-group">
                            <label>{selectedPage === 'Team' ? 'Member Name' : 'Title'}</label>
                            <input type="text" className="form-control" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                        </div>
                        {['Home', 'About', 'Event', 'Service', 'Contact'].includes(selectedPage) && (
                            <div className="form-group">
                                <label>Description</label>
                                <input type="text" className="form-control" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                            </div>
                        )}
                        <div className="form-group">
                            <label>Image URL</label>
                            <input type="text" className="form-control" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
                        </div>
                        {selectedPage === 'Event' && (
                            <div className="form-group">
                                <label>Event Date</label>
                                <input type="date" className="form-control" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                            </div>
                        )}
                        {selectedPage === 'Team' && (
                            <div className="form-group">
                                <label>Role</label>
                                <input type="text" className="form-control" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
                            </div>
                        )}
                    </div>
                    <button type="submit" className="button-primary" style={{marginTop: '20px'}}>{editingId ? 'Update' : 'Save'} Content</button>
                </form>
            </div>

            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead><tr><th>Title</th><th>Details</th><th>Actions</th></tr></thead>
                    <tbody>
                        {contents.filter(c => c.page === selectedPage).map(item => (
                            <tr key={item._id}>
                                <td>{item.title}</td>
                                <td>{item.role || (item.date ? new Date(item.date).toLocaleDateString() : 'N/A')}</td>
                                <td>
                                    <button onClick={() => editContentItem(item)} className="action-btn edit">✎ Edit</button>
                                    <button onClick={() => handleDelete(item._id, 'content')} className="action-btn delete">🗑 Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderTabContent = () => {
        switch(activeTab) {
            case 'content': return renderContentManager();
            case 'animals': return renderAnimalManager();
            case 'slots': return renderTable(overviewData.slots, { Name: 'name', Mobile: 'mobile', Date: 'date', 'Time Slot': 'timeSlot' });
            case 'volunteers': return renderTable(overviewData.volunteers, { Name: 'name', Email: 'email', Mobile: 'mobile', Skills: 'skills' });
            case 'donations': return renderTable(overviewData.donations, { Name: 'name', Mobile: 'mobile', Amount: 'amount', 'Payment ID': 'razorpay_payment_id' });
            case 'feedback': return renderTable(overviewData.feedback, { Name: 'name', Email: 'email', Feedback: 'feedback' });
            case 'complaints': return renderTable(overviewData.complaints, { Name: 'name', Email: 'email', Complaint: 'complaint' });
            default: return null;
        }
    };

    return (
        <div className="admin-container">
            <aside className="admin-sidebar">
                <h2>Admin Panel</h2>
                <nav className="admin-nav">
                    <button onClick={() => {setActiveTab('content'); setEditingId(null)}} className={`admin-nav-btn ${activeTab === 'content' ? 'active' : ''}`}>Content Manager</button>
                    <button onClick={() => {setActiveTab('animals'); setEditingId(null)}} className={`admin-nav-btn ${activeTab === 'animals' ? 'active' : ''}`}>Adoption Animals</button>
                    <button onClick={() => setActiveTab('slots')} className={`admin-nav-btn ${activeTab === 'slots' ? 'active' : ''}`}>Slot Bookings</button>
                    <button onClick={() => setActiveTab('volunteers')} className={`admin-nav-btn ${activeTab === 'volunteers' ? 'active' : ''}`}>Volunteers</button>
                    <button onClick={() => setActiveTab('donations')} className={`admin-nav-btn ${activeTab === 'donations' ? 'active' : ''}`}>Donations</button>
                    <button onClick={() => setActiveTab('feedback')} className={`admin-nav-btn ${activeTab === 'feedback' ? 'active' : ''}`}>Feedback</button>
                    <button onClick={() => setActiveTab('complaints')} className={`admin-nav-btn ${activeTab === 'complaints' ? 'active' : ''}`}>Complaints</button>
                </nav>
                <button onClick={handleLogout} className="admin-logout">Logout (Home)</button>
            </aside>
            <main className="admin-main">
                {renderTabContent()}
            </main>
        </div>
    );
};
export default AdminDashboard;