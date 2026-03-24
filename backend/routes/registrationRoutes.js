const express = require('express');
const router = express.Router();
const {
    registerEvent,
    cancelRegistration,
    getMyRegistrations
} = require('../controllers/registrationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, registerEvent);

router.get('/my', protect, getMyRegistrations);
router.delete('/:id', protect, cancelRegistration);

module.exports = router;
