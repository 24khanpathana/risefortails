const express = require('express');
const router = express.Router();
const Complaint = require('../models/complaint');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/complaints
// @desc    Submit a complaint
// @access  Public
router.post('/', async (req, res) => {
    try {
        const newComplaint = new Complaint(req.body);
        await newComplaint.save();
        res.status(201).json({ message: 'Complaint submitted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// @route   GET /api/complaints
// @desc    Get all complaints
// @access  Private (Admin)
router.get('/', protect, async (req, res) => {
    try {
        const complaints = await Complaint.find().sort({ date: -1 });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;