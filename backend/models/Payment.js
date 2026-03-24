const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    amount: { type: Number, required: true },
    status: { type: String, default: 'pending' },
    transactionId: { type: String },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
