import React from 'react';

const About = () => {
    return (
        <section id="about" className="card-theme">
            <div className="container">
                <h2 className="section-title text-primary-theme">About Us</h2>
                <p style={{textAlign: 'center', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8'}}>
                    Founded in 2020, Rise for Tails was born from a simple yet powerful idea: every animal deserves a second chance. We are a team of dedicated volunteers, veterinary professionals, and animal lovers committed to combating animal cruelty and homelessness. We operate on a no-kill principle, ensuring that every animal we rescue is cared for until they find their forever family. Our efforts are funded entirely by the generosity of donors like you. Join us in our mission to be the voice for the voiceless.
                </p>
            </div>
        </section>
    );
};

export default About;