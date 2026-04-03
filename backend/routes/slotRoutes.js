const express = require('express');
const router = express.Router();
const Slot = require('../models/Slot');
const { protect } = require('../middleware/authMiddleware');
const sendEmail = require('../utils/sendEmail');

// @route   POST /api/slots/book
// @desc    Book a new slot & send email notification
// @access  Public
router.post('/book', async (req, res) => {
    const { name, mobile, date, timeSlot, services } = req.body;
    
    // Validation: Ensure at least one service is selected
    if (!services || services.length === 0) {
        return res.status(400).json({ message: 'Please select at least one service.' });
    }

    try {
        // 1. Find all existing bookings for the requested date and time slot
        const existingBookings = await Slot.find({ date, timeSlot });

        // 2. Extract a flat array of all services that are already booked in this time slot
        const bookedServices = existingBookings.flatMap(booking => booking.services);

        // 3. Check if any of the requested services are already in the 'bookedServices' list
        const overlappingServices = services.filter(service => bookedServices.includes(service));

        if (overlappingServices.length > 0) {
            // Format the error to tell them exactly which service is taken
            const takenServices = overlappingServices.join(', ');
            return res.status(400).json({ 
                message: `The selected service (${takenServices}) is already booked for this time slot.` 
            });
        }
        
        // 4. If no overlaps, save the new booking
        const newSlot = new Slot({ name, mobile, date, timeSlot, services });
        await newSlot.save();

        // 5. Prepare and send Email Notification to Admin
        const htmlContent = `
            <h2>New Slot Booking Received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Mobile:</strong> ${mobile}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time Slot:</strong> ${timeSlot}</p>
            <p><strong>Services Required:</strong> ${services.join(', ')}</p>
        `;
        
        try {
            await sendEmail({ 
                to: process.env.ADMIN_EMAIL || 'amaanp2710@gmail.com', 
                subject: `New Slot Booking - ${name}`, 
                htmlContent 
            });
        } catch (emailError) {
            console.error("Booking saved, but email notification failed:", emailError);
        }

        res.status(201).json({ message: 'Slot booked successfully!' });
    } catch (error) {
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

// @route   DELETE /api/slots/:id
// @desc    Delete a specific slot booking
// @access  Private (Admin)
router.delete('/:id', protect, async (req, res) => {
    try {
        await Slot.findByIdAndDelete(req.params.id);
        res.json({ message: 'Slot deleted successfully' });
    } catch (error) { 
        res.status(500).json({ message: 'Server error', error }); 
    }
});



module.exports = router;