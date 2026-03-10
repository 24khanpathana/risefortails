import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pages.css';

const ServiceForm = ({ title, endpoint, fields }) => {
    const [data, setData] = useState({});
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}${endpoint}`, data);
            setMsg(res.data.message);
            setData({});
        } catch (err) {
            setMsg('Error submitting form');
        }
    };

    return (
        <div className="card mb-40">
            <h3 style={{marginBottom: '20px', color: 'var(--primary-light)'}}>{title}</h3>
            <form onSubmit={handleSubmit}>
                {fields.map(f => (
                    <div className="form-group" key={f.name}>
                        <label>{f.label || f.name}</label>
                        {f.type === 'textarea' ? (
                            <textarea className="form-control" rows="4" required onChange={e => setData({...data,[f.name]: e.target.value})} value={data[f.name] || ''}></textarea>
                        ) : (
                            <input type={f.type || 'text'} className="form-control" required onChange={e => setData({...data, [f.name]: e.target.value})} value={data[f.name] || ''} />
                        )}
                    </div>
                ))}
                <button type="submit" className="button-primary">Submit</button>
            </form>
            {msg && <p style={{marginTop: '15px', color: 'green', textAlign:'center'}}>{msg}</p>}
        </div>
    );
};

const DynamicCustomForm = ({ formMeta }) => {
    const [data, setData] = useState({});
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/forms/submit`, {
                formId: formMeta._id, formTitle: formMeta.customForm.title, data
            });
            setMsg('Form submitted successfully!');
            setData({});
        } catch (err) {
            setMsg('Error submitting form');
        }
    };

    return (
        <div className="card mb-40" style={{ borderTop: '4px solid var(--primary-light)'}}>
            <h3 style={{marginBottom: '10px'}}>{formMeta.customForm.title}</h3>
            {formMeta.description && <p style={{marginBottom: '20px', color: 'var(--secondary-light)'}}>{formMeta.description}</p>}
            <form onSubmit={handleSubmit}>
                {formMeta.customForm.fields.map((f, i) => (
                    <div className="form-group" key={i}>
                        <label>{f.name}</label>
                        <input type={f.type} className="form-control" required onChange={e => setData({...data,[f.name]: e.target.value})} value={data[f.name] || ''} />
                    </div>
                ))}
                <button type="submit" className="button-primary">Submit</button>
            </form>
            {msg && <p style={{marginTop: '15px', color: 'green', textAlign:'center'}}>{msg}</p>}
        </div>
    );
};

const Service = () => {
    const [dynamicForms, setDynamicForms] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/content`).then(res => {
            setDynamicForms(res.data.filter(c => c.page === 'Service'));
        });
    },[]);

    return (
        <section className="page-section container">
            <div className="page-intro">
                <h1 className="section-title">Our Services & Outreach</h1>
                <p>Join our cause, share your feedback, or register for our custom outreach programs below.</p>
            </div>
            
            <div className="grid-container grid-2">
                <ServiceForm title="Volunteer Apply" endpoint="/api/volunteers/apply" fields={[
                    { name: 'name', type: 'text' }, { name: 'email', type: 'email' }, { name: 'mobile', type: 'tel' }, { name: 'skills', type: 'textarea', label: 'Skills / Reason' }
                ]} />
                <ServiceForm title="Feedback" endpoint="/api/feedback" fields={[
                    { name: 'name', type: 'text' }, { name: 'email', type: 'email' }, { name: 'feedback', type: 'textarea' }
                ]} />
                <ServiceForm title="Complaints" endpoint="/api/complaints" fields={[
                    { name: 'name', type: 'text' }, { name: 'email', type: 'email' }, { name: 'complaint', type: 'textarea' }
                ]} />
                
                {dynamicForms.map(form => form.customForm?.fields?.length > 0 && (
                    <DynamicCustomForm key={form._id} formMeta={form} />
                ))}
            </div>
        </section>
    );
};
export default Service;