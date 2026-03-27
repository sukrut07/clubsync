const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const mongoose = require('mongoose');

// Register a new user
// POST /api/auth/register
const registerUser = async (req, res) => {
    // Mock Mode Fallback
    if (mongoose.connection.readyState !== 1) {
        console.warn('⚠️ MOCK SIGNUP: Bypassing MongoDB Atlas');
        const { name, email, role } = req.body;
        return res.status(201).json({
            _id: 'mock_id_' + Date.now(),
            name,
            email,
            role: role || 'student',
            token: generateToken('mock_id')
        });
    }

    try {
        const { name, email, password, role, club, branch, division, prn } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'student',
            club,
            branch,
            division,
            prn
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login user
// POST /api/auth/login
const loginUser = async (req, res) => {
    // Mock Mode Fallback
    if (mongoose.connection.readyState !== 1) {
        console.warn('⚠️ MOCK LOGIN: Bypassing MongoDB Atlas');
        const { email } = req.body;

        // Simple logic to assign role based on email or keyword
        let role = 'student';
        let name = 'Elite User';
        if (email.includes('admin')) { role = 'admin'; name = 'Super Admin'; }
        else if (email.includes('member')) { role = 'member'; name = 'Club Leader'; }

        return res.json({
            _id: 'mock_id',
            name,
            email,
            role,
            token: generateToken('mock_id')
        });
    }

    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user profile
// GET /api/auth/profile
const getProfile = async (req, res) => {
    // Mock Mode Fallback
    if (mongoose.connection.readyState !== 1) {
        return res.json({
            _id: req.user?._id || 'mock_id',
            name: 'Mock User',
            email: 'mock@test.com',
            role: 'student'
        });
    }

    try {
        const user = await User.findById(req.user._id).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

module.exports = {
    registerUser,
    loginUser,
    getProfile
};
