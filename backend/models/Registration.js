const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    teamMembers: [{ type: String }],
    leaderName: { type: String },
    department: { type: String },
    phone: { type: String },
    paymentStatus: { type: String, default: 'pending' },
    registeredAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Registration', registrationSchema);
