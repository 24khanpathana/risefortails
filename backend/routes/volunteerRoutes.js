const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/volunteers/apply
// @desc    Submit a volunteer application
// @access  Public
router.post('/apply', async (req, res) => {
    try {
        const newApplication = new Volunteer(req.body);
        await newApplication.save();
        res.status(201).json({ message: 'Application submitted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// @route   GET /api/volunteers
// @desc    Get all volunteer applications
// @access  Private (Admin)
router.get('/', protect, async (req, res) => {
    try {
        const applications = await Volunteer.find().sort({ date: -1 });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;