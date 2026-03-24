const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    clubId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
        required: true
    },
    recruitmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recruitment'
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled'],
        default: 'scheduled'
    },
    result: {
        type: String,
        enum: ['pending', 'selected', 'rejected'],
        default: 'pending'
    }
});

module.exports = mongoose.model('Interview', interviewSchema);
