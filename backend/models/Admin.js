const mongoose = require('mongoose');

// Added fields for OTP management
const AdminSchema = new mongoose.Schema({
    adminId: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
    },
    otpExpires: {
        type: Date,
    },
});

module.exports = mongoose.model('Admin', AdminSchema);