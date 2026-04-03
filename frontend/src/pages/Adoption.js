import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Adoption = () => {
    const [animals, setAnimals] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/animals`).then(res => setAnimals(res.data));
    },[]);

    return (
        <section className="page-container">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h1 className="section-title">Adopt a Best Friend</h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg">Give a loving home to a rescued animal. Browse our available animals below and find your perfect companion.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {animals.map(animal => (
                    <div key={animal._id} className="card !p-0 overflow-hidden flex flex-col">
                        <img src={animal.imageUrl} alt={animal.name} className="w-full h-64 object-cover" />
                        <div className="p-6 flex flex-col flex-grow">
                            <h2 className="text-2xl font-bold text-primary mb-3">{animal.name}</h2>
                            <div className="flex justify-between text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                                <span>Age: {animal.age}</span>
                                <span>Breed: {animal.breed}</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">{animal.description}</p>
                            <button onClick={() => { alert(`Thank you for choosing ${animal.name}! Redirecting to Contact.`); navigate('/contact'); }} className="btn-primary w-full mt-auto">
                                Adopt Me
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {animals.length === 0 && <p className="text-center text-xl mt-10 text-gray-500">No animals currently available for adoption.</p>}
        </section>
    );
};
export default Adoption;