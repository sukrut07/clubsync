const Announcement = require('../models/Announcement');

// @desc    Create an announcement
// @route   POST /api/announcements
// @access  Private (Admin/ClubMember)
const createAnnouncement = async (req, res) => {
    try {
        const { title, description, clubId } = req.body;

        const announcement = await Announcement.create({
            title,
            description,
            clubId,
            postedBy: req.user._id,
            date: new Date()
        });

        res.status(201).json(announcement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all announcements
// @route   GET /api/announcements
// @access  Public
const getAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find({}).sort({ date: -1 }).populate('clubId', 'clubName');
        res.json(announcements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete an announcement
// @route   DELETE /api/announcements/:id
// @access  Private (Admin/Creator)
const deleteAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);

        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }

        if (req.user.role !== 'admin' && announcement.postedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await announcement.deleteOne();
        res.json({ message: 'Announcement removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createAnnouncement,
    getAnnouncements,
    deleteAnnouncement
};
