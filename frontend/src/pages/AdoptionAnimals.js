import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Pages.css';

const AdoptionAnimals = () => {
    const[animals, setAnimals] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/animals`).then(res => {
            setAnimals(res.data);
        });
    },[]);

    return (
        <section className="page-section container">
            <div className="page-intro">
                <h1 className="section-title">Adopt a Pet</h1>
                <p>Give a rescued animal a second chance. Browse our available pets and find your new best friend.</p>
            </div>
            
            <div className="grid-container grid-3">
                {animals.map(pet => (
                    <div key={pet._id} className="pet-card">
                        <img 
                            src={pet.imageUrl || 'https://via.placeholder.com/300x250?text=No+Image'} 
                            alt={pet.name} 
                            className="pet-image" 
                        />
                        <div className="pet-info">
                            <h3 className="pet-name">{pet.name}</h3>
                            <div className="pet-details">
                                <span><strong>Breed:</strong> {pet.breed}</span>
                                <span><strong>Age:</strong> {pet.age}</span>
                                <span><strong>Gender:</strong> {pet.gender}</span>
                                <span><strong>Loc:</strong> {pet.location}</span>
                            </div>
                            <p className="pet-desc">{pet.description}</p>
                            <button onClick={() => navigate('/contact')} className="button-primary adopt-btn">
                                Inquire About {pet.name}
                            </button>
                        </div>
                    </div>
                ))}
                {animals.length === 0 && (
                    <p style={{textAlign: 'center', gridColumn: '1 / -1'}}>No animals available for adoption right now. Please check back later!</p>
                )}
            </div>
        </section>
    );
};

export default AdoptionAnimals;