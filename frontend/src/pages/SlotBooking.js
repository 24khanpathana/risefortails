import React, { useState } from 'react';
import axios from 'axios';

const SlotBooking = () => {
    // Note: 'services' is now an empty array []
    const [formData, setFormData] = useState({ name: '', mobile: '', date: '', timeSlot: '', services: [] });
    const[message, setMessage] = useState({ type: '', text: '' });
    
    const timeSlots =["10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM", "02:00 PM - 03:00 PM", "03:00 PM - 04:00 PM"];
    const availableServices =["X-Ray", "Cremation", "Hydrotherapy"];
    
    const today = new Date().toISOString().split('T')[0];

    // Standard input handler
    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    // Multi-select Checkbox handler
    const handleServiceChange = (e) => {
        const { value, checked } = e.target;
        let updatedServices = [...formData.services];
        
        if (checked) {
            updatedServices.push(value); // Add to array if checked
        } else {
            updatedServices = updatedServices.filter(s => s !== value); // Remove if unchecked
        }
        
        setFormData({ ...formData, services: updatedServices });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        
        // Custom Validation: Ensure at least one service is checked
        if (formData.services.length === 0) {
            setMessage({ type: 'error', text: 'Please select at least one service.' });
            return;
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/slots/book`, formData);
            setMessage({ type: 'success', text: res.data.message });
            // Reset form
            setFormData({ name: '', mobile: '', date: '', timeSlot: '', services:[] });
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'An error occurred. Please try again.' });
        }
    };

    return (
        <div className="page-container flex justify-center items-center min-h-[calc(100vh-80px)] bg-gray-50 dark:bg-[#0a0a0a]">
            <div className="card w-full max-w-2xl shadow-xl">
                <h2 className="section-title !mb-10 text-center">Book a Visit Slot</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 items-center">
                        <label className="md:text-right font-semibold text-gray-700 dark:text-gray-300">Full Name</label>
                        <div className="md:col-span-2">
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field w-full" placeholder="Enter your name" required />
                        </div>
                    </div>

                    {/* Mobile Field */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 items-center">
                        <label className="md:text-right font-semibold text-gray-700 dark:text-gray-300">Mobile No</label>
                        <div className="md:col-span-2">
                            <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="input-field w-full" placeholder="Enter mobile number" required />
                        </div>
                    </div>

                    {/* Date Field */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 items-center">
                        <label className="md:text-right font-semibold text-gray-700 dark:text-gray-300">Select Date</label>
                        <div className="md:col-span-2">
                            <input type="date" name="date" min={today} value={formData.date} onChange={handleChange} className="input-field w-full cursor-pointer" required />
                        </div>
                    </div>

                    {/* Time Slot Field */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 items-center">
                        <label className="md:text-right font-semibold text-gray-700 dark:text-gray-300">Time Slot</label>
                        <div className="md:col-span-2">
                            <select name="timeSlot" value={formData.timeSlot} onChange={handleChange} className="input-field w-full cursor-pointer" required>
                                <option value="" disabled>Select a time slot</option>
                                {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* NEW: Multi-Select Services (Checkboxes) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 items-start">
                        <label className="md:text-right font-semibold text-gray-700 dark:text-gray-300 pt-2">Select Services</label>
                        <div className="md:col-span-2 space-y-3 p-3 bg-gray-50 dark:bg-darkCard border border-gray-200 dark:border-gray-700 rounded-lg">
                            {availableServices.map(srv => (
                                <label key={srv} className="flex items-center space-x-3 cursor-pointer group">
                                    <input 
                                        type="checkbox" 
                                        value={srv} 
                                        checked={formData.services.includes(srv)} 
                                        onChange={handleServiceChange} 
                                        className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary dark:bg-gray-800 dark:border-gray-600 transition-colors cursor-pointer"
                                    />
                                    <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-primary transition-colors">
                                        {srv}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button aligned with inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 pt-4">
                        <div className="hidden md:block"></div>
                        <div className="md:col-span-2">
                            <button type="submit" className="btn-primary w-full shadow-lg">Confirm Booking</button>
                        </div>
                    </div>
                </form>

                {message.text && (
                    <div className={`mt-6 p-4 rounded-lg text-center font-medium ${message.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                        {message.text}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SlotBooking;