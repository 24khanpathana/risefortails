const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/feedback
// @desc    Submit feedback
// @access  Public
router.post('/', async (req, res) => {
    try {
        const newFeedback = new Feedback(req.body);
        await newFeedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// @route   GET /api/feedback
// @desc    Get all feedback
// @access  Private (Admin)
router.get('/', protect, async (req, res) => {
    try {
        const feedback = await Feedback.find().sort({ date: -1 });
        res.json(feedback);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;