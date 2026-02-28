const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    amount: { type: Number, required: true },
    razorpay_payment_id: { type: String, required: true },
    razorpay_order_id: { type: String, required: true },
    razorpay_signature: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Donation', DonationSchema);