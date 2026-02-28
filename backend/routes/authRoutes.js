const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Admin = require('../models/Admin');
const Setting = require('../models/Setting');
const sendEmail = require('../models/sendEmail');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/auth/login
// @desc    Step 1: Authenticate admin, generate and send OTP
// @access  Public
router.post('/login', async (req, res) => {
    const { adminId, password } = req.body;

    try {
        const admin = await Admin.findOne({ adminId });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        const settings = await Setting.findOne();
        if (settings && settings.isOtpEnabled) {
            // Generate 4-digit OTP
            const otp = Math.floor(1000 + Math.random() * 9000).toString();
            admin.otp = otp;
            admin.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
            await admin.save();

            // Send OTP via email
            try {
                await sendEmail({
                    to: settings.otpEmails,
                    subject: 'Your Login OTP for Rise for Tails Admin',
                    message: `Your One-Time Password is: ${otp}\nIt is valid for 10 minutes.`,
                });
                res.status(200).json({ message: 'OTP sent to registered email.', otpRequired: true });
            } catch (emailError) {
                console.error(emailError);
                return res.status(500).json({ message: 'Error sending OTP email.' });
            }
        } else {
            // OTP is disabled, log in directly
            const payload = { id: admin.id, adminId: admin.adminId };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
            res.json({ token, otpRequired: false });
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/auth/verify-otp
// @desc    Step 2: Verify OTP and get token
// @access  Public
router.post('/verify-otp', async (req, res) => {
    const { adminId, otp } = req.body;
    try {
        const admin = await Admin.findOne({
            adminId,
            otp,
            otpExpires: { $gt: Date.now() }
        });

        if (!admin) {
            return res.status(400).json({ message: 'Invalid or expired OTP.' });
        }
        
        // Clear OTP fields
        admin.otp = undefined;
        admin.otpExpires = undefined;
        await admin.save();

        const payload = { id: admin.id, adminId: admin.adminId };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '8h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


// @route   POST /api/auth/change-password
// @desc    Change admin password
// @access  Private
router.post('/change-password', protect, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    // Assuming only one admin for now. In a multi-admin system, you'd get adminId from JWT.
    const admin = await Admin.findOne(); 

    if (!admin) {
        return res.status(404).json({ message: 'Admin not found.' });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect current password.' });
    }

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(newPassword, salt);
    await admin.save();

    res.json({ message: 'Password updated successfully.' });
});

module.exports = router;