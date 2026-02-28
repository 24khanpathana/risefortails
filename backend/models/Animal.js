const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tag: { type: String, required: true }, // e.g., Dog, Cat
    age: { type: String, required: true },
    breed: { type: String, required: true },
    healthStatus: { type: String, required: true },
    story: { type: String, required: true },
    imageUrl: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Animal', AnimalSchema);