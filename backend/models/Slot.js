const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    date: { type: String, required: true }, // Store as string 'YYYY-MM-DD' for easier querying
    timeSlot: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

// Ensure a time slot can only be booked once per day
SlotSchema.index({ date: 1, timeSlot: 1 }, { unique: true });

module.exports = mongoose.model('Slot', SlotSchema);