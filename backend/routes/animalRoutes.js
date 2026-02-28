const express = require('express');
const router = express.Router();
const Animal = require('../models/Animal');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/animals
// @desc    Get all animals available for adoption
// @access  Public
router.get('/', async (req, res) => {
    try {
        const animals = await Animal.find().sort({ createdAt: -1 });
        res.json(animals);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   POST /api/animals
// @desc    Add a new animal listing
// @access  Private (Admin)
router.post('/', protect, async (req, res) => {
    try {
        const newAnimal = new Animal(req.body);
        const animal = await newAnimal.save();
        res.status(201).json(animal);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   PUT /api/animals/:id
// @desc    Update an animal listing
// @access  Private (Admin)
router.put('/:id', protect, async (req, res) => {
    try {
        const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!animal) return res.status(404).json({ message: 'Animal not found' });
        res.json(animal);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   DELETE /api/animals/:id
// @desc    Delete an animal listing
// @access  Private (Admin)
router.delete('/:id', protect, async (req, res) => {
    try {
        const animal = await Animal.findByIdAndDelete(req.params.id);
        if (!animal) return res.status(404).json({ message: 'Animal not found' });
        res.json({ message: 'Animal removed successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;