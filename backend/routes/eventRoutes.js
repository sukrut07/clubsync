const express = require('express');
const router = express.Router();
const {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent
} = require('../controllers/eventController');
const { protect, memberOnly } = require('../middleware/authMiddleware');

router.route('/')
    .get(getEvents)
    .post(protect, memberOnly, createEvent);

router.route('/:id')
    .get(getEventById)
    .put(protect, updateEvent)
    .delete(protect, deleteEvent);

module.exports = router;
