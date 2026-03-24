const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName: { type: String, required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    clubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' },
    deadline: { type: Date },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    submissionLink: { type: String },
    approved: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);
