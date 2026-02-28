import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import AnimalCard from '../components/AnimalCard';
import AnimalDetailModal from '../components/AnimalDetailModal';
import './AdoptionPage.css';

const AdoptionPage = () => {
    const [animals, setAnimals] = useState([]);
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/animals`);
                setAnimals(data);
            } catch (error) {
                console.error("Failed to fetch animals:", error);
            }
        };
        fetchAnimals();
    }, []);

    const handleCardClick = (animal) => {
        setSelectedAnimal(animal);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedAnimal(null);
    };

    return (
        <>
            <Navbar />
            <div className="adoption-page-container">
                <h1 className="adoption-title text-primary-theme">Available for Adoption</h1>
                <div className="animal-grid">
                    {animals.length > 0 ? (
                        animals.map(animal => (
                            <AnimalCard key={animal._id} animal={animal} onClick={() => handleCardClick(animal)} />
                        ))
                    ) : (
                        <p>No animals currently available. Please check back soon!</p>
                    )}
                </div>
            </div>
            {isModalOpen && <AnimalDetailModal animal={selectedAnimal} onClose={closeModal} />}
        </>
    );
};

export default AdoptionPage;