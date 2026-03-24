const express = require('express');
const router = express.Router();
const { createTask, getMyTasks, submitTask, approveTask } = require('../controllers/taskController');
const { protect, memberOnly } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, memberOnly, createTask);

router.get('/my', protect, getMyTasks);
router.put('/:id/submit', protect, submitTask);
router.put('/:id/approve', protect, memberOnly, approveTask);

module.exports = router;
