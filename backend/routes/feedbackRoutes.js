const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const { protect } = require('../middleware/authMiddleware');
const sendEmail = require('../utils/sendEmail');

router.post('/', async (req, res) => {
    try {
        const newFeedback = new Feedback(req.body);
        await newFeedback.save();

        const htmlContent = `
            <h2>New Feedback Received</h2>
            <p><strong>Name:</strong> ${req.body.name}</p>
            <p><strong>Email:</strong> ${req.body.email}</p>
            <p><strong>Feedback:</strong> ${req.body.feedback}</p>
        `;
        await sendEmail({ 
            to: process.env.ADMIN_ID || 'amaanp2710@gmail.com', 
            subject: 'New Feedback Submitted', 
            htmlContent 
        });

        res.status(201).json({ message: 'Feedback submitted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.get('/', protect, async (req, res) => {
    try {
        const feedback = await Feedback.find().sort({ date: -1 });
        res.json(feedback);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;