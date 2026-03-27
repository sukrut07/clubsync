const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// POST /api/events/create
router.post('/create', protect, adminOnly, async (req, res) => {
    try {
        const { title, description, club, date, time, venue, createdBy } = req.body;
        const newEvent = new Event({
            title,
            description,
            club,
            date,
            time,
            venue,
            createdBy
        });
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/events/all
router.get('/all', async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/events/club/:club
router.get('/club/:club', async (req, res) => {
    try {
        const events = await Event.find({ club: req.params.club }).sort({ date: 1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
