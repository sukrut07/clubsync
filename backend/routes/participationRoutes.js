const express = require('express');
const router = express.Router();
const {
    markAttendance,
    getLeaderboard,
    getParticipation
} = require('../controllers/participationController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/mark', protect, adminOnly, markAttendance);
router.get('/leaderboard', getLeaderboard);
router.get('/my', protect, getParticipation);

module.exports = router;
