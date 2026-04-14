import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Gallery = () => {
    const [content, setContent] = useState([]);
    const navigate = useNavigate();

    // Fetch dynamic content added via Admin Panel for the 'Gallery' page
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/content`)
            .then(res => {
                setContent(res.data.filter(c => c.page === 'Gallery'));
            })
            .catch(err => console.error("Error fetching gallery content:", err));
    },[]);

    return (
        <div className="w-full font-sans text-gray-800 bg-[#FAFAFA] min-h-screen pb-20">
            
            {/* 1. EMOTIONAL HEADER */}
            <div className="bg-emerald-900 text-white py-20 px-6 text-center border-b border-emerald-800 shadow-inner">
                <span className="text-emerald-300 font-bold tracking-widest uppercase text-sm mb-4 inline-block">Moments of Hope</span>
                <h1 className="text-4xl md:text-6xl font-serif font-black mb-6 tracking-tight">Our Gallery.</h1>
                <p className="text-lg md:text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
                    Photos and stories showcasing the work of Rise for Tails and the animals whose lives have been transformed through compassion and care.
                </p>
            </div>

            {/* 2. GALLERY GRID (Adoption Card Style) */}
            <section className="max-w-7xl mx-auto px-6 mt-20 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {content.map(item => (
                        <div key={item._id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col group">
                            
                            {/* Image Section */}
                            <div className="relative overflow-hidden h-72">
                                {item.imageUrl ? (
                                    <img 
                                        src={item.imageUrl} 
                                        alt={item.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                    />
                                ) : (
                                    <div className="w-full h-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold opacity-50">
                                        Rise for Tails
                                    </div>
                                )}
                            </div>

                            {/* Card Body */}
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex justify-between items-end mb-4">
                                    <h2 className="text-3xl font-black text-gray-900">{item.title}</h2>
                                </div>
                                
                                {/* Optional Badges: Maps to 'Role' and 'Event Date' in Admin Panel */}
                                {(item.role || item.date) && (
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {item.role && (
                                            <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                                                {item.role}
                                            </span>
                                        )}
                                        {item.date && (
                                            <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                                                {new Date(item.date).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                )}

                                <p className="text-gray-600 leading-relaxed mb-8 flex-grow whitespace-pre-wrap">
                                    {item.description}
                                </p>
                                
                                {/* Call to Action Button */}
                                <button 
                                    onClick={() => navigate('/donate')} 
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-emerald-600/20"
                                >
                                    Support Our Work
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State if no content is added from Admin yet */}
                {content.length === 0 && (
                    <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center shadow-sm max-w-2xl mx-auto mt-10">
                        <p className="text-gray-500 text-lg font-medium">No gallery items have been published yet. Please check back later!</p>
                    </div>
                )}
            </section>

        </div>
    );
};

export default Gallery;