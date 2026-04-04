import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceForm = ({ title, endpoint, fields }) => {
    const[data, setData] = useState({});
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}${endpoint}`, data);
            setMsg(res.data.message); setData({});
        } catch (err) { setMsg('Error submitting form'); }
    };

    return (
        <div className="card">
            <h3 className="text-2xl font-bold text-primary mb-6">{title}</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
                {fields.map(f => (
                    <div key={f.name}>
                        <label className="block text-sm font-medium mb-2 capitalize">{f.label || f.name}</label>
                        {f.type === 'textarea' ? (
                            <textarea className="input-field" rows="4" required onChange={e => setData({...data,[f.name]: e.target.value})} value={data[f.name] || ''} />
                        ) : (
                            <input type={f.type || 'text'} className="input-field" required onChange={e => setData({...data, [f.name]: e.target.value})} value={data[f.name] || ''} />
                        )}
                    </div>
                ))}
                <button type="submit" className="btn-primary w-full">Submit</button>
            </form>
            {msg && <p className="mt-4 text-center font-medium text-green-600">{msg}</p>}
        </div>
    );
};

const Service = () => {
    const[dynamicForms, setDynamicForms] = useState([]);
    useEffect(() => { axios.get(`${process.env.REACT_APP_API_URL}/api/content`).then(res => setDynamicForms(res.data.filter(c => c.page === 'Service'))); },[]);

    return (
        <section className="page-container">
            <div className="text-center mb-12">
                <h1 className="section-title">Our Services & Outreach</h1>
                <p className="text-gray-600 dark:text-gray-300">Join our cause, share your feedback, or register for our custom outreach programs.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ServiceForm title="Volunteer Apply" endpoint="/api/volunteers/apply" fields={[{ name: 'name' }, { name: 'email', type: 'email' }, { name: 'mobile', type: 'tel' }, { name: 'skills', type: 'textarea', label: 'Skills / Reason' }]} />
                <ServiceForm title="Feedback" endpoint="/api/feedback" fields={[{ name: 'name' }, { name: 'email', type: 'email' }, { name: 'feedback', type: 'textarea' }]} />
                <ServiceForm title="Complaints" endpoint="/api/complaints" fields={[{ name: 'name' }, { name: 'email', type: 'email' }, { name: 'complaint', type: 'textarea' }]} />
                {/* Dynamically render custom forms here if needed */}
            </div>
        </section>
    );
};
export default Service;