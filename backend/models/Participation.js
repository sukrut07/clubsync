const mongoose = require('mongoose');

const participationSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    attendance: { type: Boolean, default: false },
    pointsEarned: { type: Number, default: 0 },
    certificate: { type: String },
    clubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' },
    markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    markedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Participation', participationSchema);
