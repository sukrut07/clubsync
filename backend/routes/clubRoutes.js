const express = require('express');
const router = express.Router();

// GET /api/clubs
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Clubs route – coming soon' });
});

// GET /api/clubs/:id
router.get('/:id', (req, res) => {
    res.status(200).json({ message: `Club ${req.params.id} – coming soon` });
});

module.exports = router;
