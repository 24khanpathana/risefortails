const mongoose = require('mongoose');

const VolunteerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    skills: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Volunteer', VolunteerSchema);