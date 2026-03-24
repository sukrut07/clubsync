const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/test-db
// This is a temporary route to test if models work and DB connection is fine
router.get('/', async (req, res) => {
    try {
        // Create a dummy user
        const dummyUser = new User({
            name: 'Test Student',
            email: `test-${Date.now()}@clubsync.com`,
            password: 'password123',
            role: 'student',
            department: 'Computer Science',
            year: 2,
        });

        await dummyUser.save();

        res.status(201).json({
            message: '✅ Database Model Test Successful!',
            user: {
                id: dummyUser._id,
                name: dummyUser.name,
                email: dummyUser.email,
                role: dummyUser.role
            }
        });
    } catch (error) {
        console.error('❌ DB Test Route Error:', error);
        res.status(500).json({
            message: '❌ Database Model Test Failed',
            error: error.message
        });
    }
});

module.exports = router;
