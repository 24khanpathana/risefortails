const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true }, // e.g., dog, cat, etc.
    breed: { type: String },
    age: { type: Number },
    gender: { type: String, enum: ['Male', 'Female', 'Unknown'] },
    description: { type: String },
    imageUrl: { type: String },
    status: { type: String, enum: ['Available', 'Adopted', 'Pending'], default: 'Available' },
    healthStatus: { type: String },
    vaccinated: { type: Boolean, default: false },
    neutered: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Animal', AnimalSchema);