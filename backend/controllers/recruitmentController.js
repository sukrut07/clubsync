const Recruitment = require('../models/Recruitment');
const Interview = require('../models/Interview');

const createRecruitment = async (req, res) => {
    try {
        const { clubId, role, description, deadline } = req.body;
        const recruitment = await Recruitment.create({ clubId, role, description, deadline });
        res.status(201).json(recruitment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRecruitments = async (req, res) => {
    try {
        const recruitments = await Recruitment.find({}).populate('clubId', 'clubName');
        res.json(recruitments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const scheduleInterview = async (req, res) => {
    try {
        const { studentId, clubId, date, time } = req.body;
        const interview = await Interview.create({ studentId, clubId, date, time });
        res.status(201).json(interview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createRecruitment, getRecruitments, scheduleInterview };
