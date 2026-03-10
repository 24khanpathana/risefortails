import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Pages.css';

const About = () => {
    const [content, setContent] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/content`).then(res => {
            setContent(res.data.filter(c => c.page === 'About'));
        });
    },[]);

    return (
        <section className="page-section container">
            <h1 className="section-title">About Us</h1>
            <div className="grid-container grid-2">
                {content.map(item => (
                    <div key={item._id} className="card">
                        {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="content-image" />}
                        <h3>{item.title}</h3>
                        <p style={{marginTop: '10px', lineHeight: '1.6'}}>{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
export default About;