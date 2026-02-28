const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Admin = require('./models/Admin');
const Setting = require('./models/Setting'); // Import Setting model

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// --- Initial Admin & Settings Creation (Run Once) ---
// This function creates the first admin user and default settings.
// UNCOMMENT it, run the server once, then COMMENT it out again.

const initializeSystem = async () => {
    try {
        // Create Admin
        const adminExists = await Admin.findOne({ adminId: process.env.ADMIN_ID });
        if (!adminExists) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);
            const newAdmin = new Admin({ adminId: process.env.ADMIN_ID, password: hashedPassword });
            await newAdmin.save();
            console.log('Admin user created successfully.');
        } else {
            console.log('Admin user already exists.');
        }

        // Create Default Settings
        const settingsExist = await Setting.findOne();
        if (!settingsExist) {
            const defaultSettings = new Setting({
                otpEmails: [process.env.ADMIN_OTP_EMAIL],
                isOtpEnabled: true,
            });
            await defaultSettings.save();
            console.log('Default settings created successfully.');
        } else {
            console.log('Settings already exist.');
        }
    } catch (error) {
        console.error('Error initializing system:', error);
    }
};


// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('MongoDB connected successfully.');
    // initializeSystem(); // UNCOMMENT to run, then COMMENT out.
})
.catch(err => console.error('MongoDB connection error:', err));


// --- API Routes ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/slots', require('./routes/slotRoutes'));
app.use('/api/donations', require('./routes/donationRoutes'));
app.use('/api/volunteers', require('./routes/volunteerRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/complaints', require('./routes/complaintRoutes'));
app.use('/api/content', require('./routes/contentRoutes'));
app.use('/api/animals', require('./routes/animalRoutes')); // New Route
app.use('/api/settings', require('./routes/settingRoutes')); // New Route


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));