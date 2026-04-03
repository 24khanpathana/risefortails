const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    date: { type: String, required: true }, // Stored as 'YYYY-MM-DD'
    timeSlot: { type: String, required: true },
    services: { type: [String], required: true }, // Array of selected services
    createdAt: { type: Date, default: Date.now },
});

// NOTE: The previous unique index on { date: 1, timeSlot: 1 } has been removed 
// so multiple people can book the same slot for different services.

module.exports = mongoose.model('Slot', SlotSchema);