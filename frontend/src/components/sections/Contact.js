import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
    return (
        <section id="contact" className="card-theme">
            <div className="container">
                <h2 className="section-title text-primary-theme">Contact Us</h2>
                <div className="contact-info-grid">
                    <div className="contact-info-item">
                        <FaMapMarkerAlt className="contact-icon" />
                        <h3>Address</h3>
                        <p>123 Animal Lane, Welfare City, 400001</p>
                    </div>
                    <div className="contact-info-item">
                        <FaPhone className="contact-icon" />
                        <h3>Phone</h3>
                        <p>+91 98765 43210</p>
                    </div>
                    <div className="contact-info-item">
                        <FaEnvelope className="contact-icon" />
                        <h3>Email</h3>
                        <p>contact@risefortails.org</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;