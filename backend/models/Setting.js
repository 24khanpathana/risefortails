const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
    otpEmails: {
        type: [String],
        required: true,
        default: []
    },
    isOtpEnabled: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model('Setting', SettingSchema);