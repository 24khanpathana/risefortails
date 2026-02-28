import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaHandHoldingHeart, FaUsers, FaPaw } from 'react-icons/fa';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <section id="home">
            <div className="hero-carousel">
                <div className="hero-slide" style={{backgroundImage: `url('https://source.unsplash.com/1600x900/?animal,dog,rescue')`}}>
                    <div className="hero-content">
                        <h1>Welcome to Rise for Tails</h1>
                        <p>Giving every animal a chance to live and be loved.</p>
                        <button onClick={() => navigate('/donate')} className="button-primary hero-button">Donate Now</button>
                        <button onClick={() => navigate('/book-a-slot')} className="button-primary hero-button">Book a Slot</button>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="intro-text">
                    <p>
                        Rise for Tails is a non-profit organization dedicated to rescuing, rehabilitating, and rehoming animals in need. Our mission is to provide a safe haven for the voiceless and create a community that values and protects all living beings.
                    </p>
                </div>

                <div className="info-blocks">
                    <div className="info-card card-theme">
                        <FaPaw className="info-icon text-primary-theme" />
                        <h3>Animal Rescue</h3>
                        <p>We respond to distress calls to rescue animals from abuse, neglect, and abandonment.</p>
                    </div>
                    <div className="info-card card-theme">
                        <FaHeartbeat className="info-icon text-primary-theme" />
                        <h3>Medical Support</h3>
                        <p>Our team provides essential medical care, vaccinations, and spay/neuter services.</p>
                    </div>
                    {/* Updated Adoption Card */}
                    <div className="info-card card-theme clickable" onClick={() => navigate('/animals-for-adoption')}>
                        <FaHandHoldingHeart className="info-icon text-primary-theme" />
                        <h3>Adoption</h3>
                        <p>View animals currently available for adoption.</p>
                    </div>
                    <div className="info-card card-theme">
                        <FaUsers className="info-icon text-primary-theme" />
                        <h3>Volunteer Work</h3>
                        <p>Join our passionate team of volunteers and make a direct impact on animal lives.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;