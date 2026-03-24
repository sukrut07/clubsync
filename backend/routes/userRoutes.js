const express = require('express');
const router = express.Router();

// GET /api/users
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Users route – coming soon' });
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
    res.status(200).json({ message: `User ${req.params.id} – coming soon` });
});

module.exports = router;
