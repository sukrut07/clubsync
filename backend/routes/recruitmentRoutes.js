const express = require('express');
const router = express.Router();
const { createRecruitment, getRecruitments, scheduleInterview } = require('../controllers/recruitmentController');
const { protect, adminOnly, memberOnly } = require('../middleware/authMiddleware');

router.route('/')
    .get(getRecruitments)
    .post(protect, memberOnly, createRecruitment);

router.post('/interview', protect, memberOnly, scheduleInterview);

module.exports = router;
