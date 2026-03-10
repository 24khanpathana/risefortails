import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Pages.css';

const Team = () => {
    const [team, setTeam] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/content`).then(res => {
            setTeam(res.data.filter(c => c.page === 'Team'));
        });
    },[]);

    return (
        <section className="page-section container">
            <h1 className="section-title">Meet Our Team</h1>
            <div className="grid-container grid-4">
                {team.map(member => (
                    <div key={member._id} className="card text-center">
                        <div className="team-image-wrapper">
                            <img src={member.imageUrl || 'https://via.placeholder.com/150'} alt={member.title} />
                        </div>
                        <h3 style={{marginBottom: '5px'}}>{member.title}</h3>
                        <p style={{color: 'var(--primary-light)', fontWeight: 'bold', marginBottom: '10px'}}>{member.role}</p>
                        <p style={{fontSize: '0.9rem'}}>{member.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
export default Team;