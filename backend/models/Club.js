const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
    clubName: { type: String, required: true },
    description: { type: String },
    banner: { type: String },
    contactEmail: { type: String },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    points: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Club', clubSchema);
