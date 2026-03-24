const express = require('express');
const router = express.Router();
const { createAnnouncement, getAnnouncements, deleteAnnouncement } = require('../controllers/announcementController');
const { protect, memberOnly } = require('../middleware/authMiddleware');

router.route('/')
    .get(getAnnouncements)
    .post(protect, memberOnly, createAnnouncement);

router.delete('/:id', protect, deleteAnnouncement);

module.exports = router;
