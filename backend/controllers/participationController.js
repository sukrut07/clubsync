const Participation = require('../models/Participation');
const User = require('../models/User');

// @desc    Mark attendance for an event
// @route   POST /api/participation/mark
// @access  Private (Admin)
const markAttendance = async (req, res) => {
    try {
        const { studentId, eventId, attendance, pointsEarned, clubId } = req.body;

        let participation = await Participation.findOne({ studentId, eventId });

        if (participation) {
            participation.attendance = attendance;
            participation.pointsEarned = pointsEarned;
            participation.markedBy = req.user._id;
            await participation.save();
        } else {
            participation = await Participation.create({
                studentId,
                eventId,
                attendance,
                pointsEarned,
                clubId,
                markedBy: req.user._id
            });
        }

        // Award points to the user
        if (attendance && pointsEarned > 0) {
            await User.findByIdAndUpdate(studentId, {
                $inc: { points: pointsEarned }
            });
        }

        res.json(participation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get leaderboard
// @route   GET /api/participation/leaderboard
// @access  Public
const getLeaderboard = async (req, res) => {
    try {
        const students = await User.find({ role: 'student' })
            .sort({ points: -1 })
            .limit(10)
            .select('name points badges department');

        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get my participation history
// @route   GET /api/participation/my
// @access  Private
const getParticipation = async (req, res) => {
    try {
        const history = await Participation.find({ studentId: req.user._id }).populate('eventId');
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    markAttendance,
    getLeaderboard,
    getParticipation
};
