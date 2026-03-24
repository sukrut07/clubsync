const Registration = require('../models/Registration');
const Event = require('../models/Event');

// @desc    Register for an event
// @route   POST /api/registration
// @access  Private (Student/Member/Admin)
const registerEvent = async (req, res) => {
    try {
        const {
            eventId,
            teamMembers,
            leaderName,
            department,
            phone
        } = req.body;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if already registered
        const existingRegistration = await Registration.findOne({
            studentId: req.user._id,
            eventId: eventId
        });

        if (existingRegistration) {
            return res.status(400).json({ message: 'Already registered for this event' });
        }

        // Check team size if applicable
        if (event.teamAllowed && teamMembers && teamMembers.length > event.teamSize - 1) {
            return res.status(400).json({ message: `Team size exceeds limit of ${event.teamSize}` });
        }

        const registration = await Registration.create({
            studentId: req.user._id,
            eventId,
            teamMembers,
            leaderName,
            department,
            phone,
            paymentStatus: 'confirmed' // Mocking confirmed for simplicity
        });

        res.status(201).json(registration);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Cancel registration
// @route   DELETE /api/registration/:id
// @access  Private (Owner/Admin)
const cancelRegistration = async (req, res) => {
    try {
        const registration = await Registration.findById(req.params.id);

        if (!registration) {
            return res.status(404).json({ message: 'Registration not found' });
        }

        if (registration.studentId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to cancel this registration' });
        }

        await registration.deleteOne();
        res.json({ message: 'Registration cancelled' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get my registrations
// @route   GET /api/registration/my
// @access  Private
const getMyRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find({ studentId: req.user._id }).populate('eventId');
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerEvent,
    cancelRegistration,
    getMyRegistrations
};
