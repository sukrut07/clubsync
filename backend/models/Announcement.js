const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    clubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' }
});

module.exports = mongoose.model('Announcement', announcementSchema);
