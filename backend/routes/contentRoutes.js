const express = require('express');
const router = express.Router();
const DynamicContent = require('../models/DynamicContent');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/content
// @desc    Create dynamic content
// @access  Private (Admin)
router.post('/', protect, async (req, res) => {
    try {
        const newContent = new DynamicContent(req.body);
        await newContent.save();
        res.status(201).json(newContent);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// @route   GET /api/content
// @desc    Get all dynamic content for the public site
// @access  Public
router.get('/', async (req, res) => {
    try {
        const content = await DynamicContent.find().sort({ createdAt: 1 });
        res.json(content);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;