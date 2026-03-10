import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHeartbeat, FaHandHoldingHeart, FaUsers, FaPaw } from 'react-icons/fa';
import './Pages.css';

const Home = () => {
    const navigate = useNavigate();
    const [content, setContent] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/content`).then(res => {
            setContent(res.data.filter(c => c.page === 'Home'));
        });
    },[]);

    return (
        <div>
            <div className="hero-wrapper">
                <video autoPlay loop muted playsInline className="hero-video">
                    <source src="/BG.mp4" type="video/mp4" />
                </video>
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1>Rise for Tails</h1>
                    <p>Giving every animal a chance to live and be loved. Join our mission.</p>
                    <div className="hero-buttons">
                        <button onClick={() => navigate('/donate')} className="button-primary">Donate Now</button>
                        <button onClick={() => navigate('/book-a-slot')} className="button-primary" style={{backgroundColor: '#fff', color: 'var(--primary-light)'}}>Book Animal Therapy</button>
                    </div>
                </div>
            </div>

            <section className="page-section container">
                <div className="page-intro">
                    <h2 className="section-title">Our Mission & Vision</h2>
                    <p>Dedicated to rescuing, rehabilitating, and rehoming animals in need. We provide pet cremation services, animal therapy, and comprehensive medical support.</p>
                </div>

                <div className="grid-container grid-4 mb-40">
                    <div className="card icon-card">
                        <FaPaw className="card-icon" />
                        <h3>Rescue & Care</h3>
                        <p>Responding to distress calls.</p>
                    </div>
                    <div className="card icon-card">
                        <FaHeartbeat className="card-icon" />
                        <h3>Medical Support</h3>
                        <p>Vaccinations & surgeries.</p>
                    </div>
                    {/* Update this specific card in Home.js */}
                    <div className="card icon-card" onClick={() => navigate('/adoption-animals')} style={{cursor: 'pointer'}}>
                         <FaHandHoldingHeart className="card-icon" />
                         <h3>Adoption</h3>
                         <p>We connect our rescued animals with loving forever homes through a careful adoption process. Click here!</p>
                    </div>
                    <div className="card icon-card">
                        <FaUsers className="card-icon" />
                        <h3>Cremation Services</h3>
                        <p>Dignified farewells for pets.</p>
                    </div>
                </div>

                <div className="grid-container grid-2">
                    {content.map(item => (
                        <div key={item._id} className="card">
                            {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="content-image" />}
                            <h3>{item.title}</h3>
                            <p style={{marginTop: '10px'}}>{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};
export default Home;