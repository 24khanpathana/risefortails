const express = require('express');
const router = express.Router();
const Setting = require('../models/Setting');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/settings
// @desc    Get current settings
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const settings = await Setting.findOne();
        res.json(settings);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   PUT /api/settings
// @desc    Update settings
// @access  Private
router.put('/', protect, async (req, res) => {
    try {
        const settings = await Setting.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.json(settings);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;