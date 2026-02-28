const express = require('express');
const router = express.Router();
const Slot = require('../models/Slot');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/slots/book
// @desc    Book a new slot
// @access  Public
router.post('/book', async (req, res) => {
    const { name, mobile, date, timeSlot } = req.body;
    try {
        const existingSlot = await Slot.findOne({ date, timeSlot });
        if (existingSlot) {
            return res.status(400).json({ message: 'This time slot is already booked for the selected date.' });
        }
        const newSlot = new Slot({ name, mobile, date, timeSlot });
        await newSlot.save();
        res.status(201).json({ message: 'Slot booked successfully!' });
    } catch (error) {
        if (error.code === 11000) { // Handle duplicate key error from index
             return res.status(400).json({ message: 'This time slot is already booked for the selected date.' });
        }
        res.status(500).json({ message: 'Server error', error });
    }
});

// @route   GET /api/slots
// @desc    Get all slot bookings
// @access  Private (Admin)
router.get('/', protect, async (req, res) => {
    try {
        const slots = await Slot.find().sort({ createdAt: -1 });
        res.json(slots);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// @route   GET /api/slots/today
// @desc    Get today's slot bookings
// @access  Private (Admin)
router.get('/today', protect, async (req, res) => {
    try {
        const today = new Date();
        const todayString = today.toISOString().split('T')[0]; // Format to 'YYYY-MM-DD'
        
        const slots = await Slot.find({ date: todayString }).sort({ timeSlot: 1 });
        res.json(slots);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


module.exports = router;