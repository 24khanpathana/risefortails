const express = require('express');
const router = express.Router();
const DynamicContent = require('../models/DynamicContent');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, async (req, res) => {
    try {
        const newContent = new DynamicContent(req.body);
        await newContent.save();
        res.status(201).json(newContent);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.get('/', async (req, res) => {
    try {
        const content = await DynamicContent.find().sort({ createdAt: -1 });
        res.json(content);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.put('/:id', protect, async (req, res) => {
    try {
        const updated = await DynamicContent.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.delete('/:id', protect, async (req, res) => {
    try {
        await DynamicContent.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;