const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const router = express.Router();
const Donation = require('../models/Donation');
const { protect } = require('../middleware/authMiddleware');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @route   POST /api/donations/order
// @desc    Create Razorpay order
// @access  Public
router.post('/order', async (req, res) => {
    try {
        const options = {
            amount: Number(req.body.amount) * 100, // amount in the smallest currency unit
            currency: "INR",
            receipt: `receipt_order_${new Date().getTime()}`,
        };
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
});

// @route   POST /api/donations/verify
// @desc    Verify payment and save donation
// @access  Public
router.post('/verify', async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        name,
        mobile,
        amount
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

    if (expectedSignature === razorpay_signature) {
        // Payment is successful
        try {
            const newDonation = new Donation({
                name,
                mobile,
                amount,
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
            });
            await newDonation.save();
            res.status(201).json({ message: "Payment verified and donation saved successfully." });
        } catch (dbError) {
            res.status(500).json({ message: "Database error", error: dbError });
        }
    } else {
        res.status(400).json({ message: "Payment verification failed." });
    }
});


// @route   GET /api/donations
// @desc    Get all donations
// @access  Private (Admin)
router.get('/', protect, async (req, res) => {
    try {
        const donations = await Donation.find().sort({ date: -1 });
        res.json(donations);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;