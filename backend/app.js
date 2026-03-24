const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/test', require('./routes/testRoute'));
app.use('/api/test-db', require('./routes/testDbRoute'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/clubs', require('./routes/clubRoutes'));
app.use('/api/events', require('./routes/event'));
app.use('/api/registration', require('./routes/registrationRoutes'));
app.use('/api/participation', require('./routes/participationRoutes'));
app.use('/api/announcements', require('./routes/announcementRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/recruitment', require('./routes/recruitmentRoutes'));

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message || 'Internal Server Error' });
});

module.exports = app;
