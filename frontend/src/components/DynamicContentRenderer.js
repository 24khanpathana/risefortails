import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DynamicContentRenderer.css';

const DynamicContentRenderer = ({ position }) => {
    const [content, setContent] = useState([]);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/content`);
                const filteredContent = data.filter(item => item.position === position);
                setContent(filteredContent);
            } catch (error) {
                console.error("Failed to fetch dynamic content", error);
            }
        };
        fetchContent();
    }, [position]);

    if (content.length === 0) {
        return null;
    }

    return (
        <div>
            {content.map(item => (
                <section key={item._id} className="dynamic-content-section card-theme">
                    <div className="container">
                        <h2 className="section-title text-primary-theme">{item.title}</h2>
                        {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="dynamic-image" />}
                        <p className="dynamic-description text-theme">{item.description}</p>
                    </div>
                </section>
            ))}
        </div>
    );
};

export default DynamicContentRenderer;