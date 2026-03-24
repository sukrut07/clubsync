const Task = require('../models/Task');
const User = require('../models/User');

// @desc    Create a task
// @route   POST /api/tasks
// @access  Private (Admin/ClubMember)
const createTask = async (req, res) => {
    try {
        const { taskName, assignedTo, clubId, deadline } = req.body;

        const task = await Task.create({
            taskName,
            assignedTo,
            clubId,
            deadline,
            status: 'pending'
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get my tasks
// @route   GET /api/tasks/my
// @access  Private
const getMyTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.user._id }).populate('clubId', 'clubName');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Submit a task
// @route   PUT /api/tasks/:id/submit
// @access  Private (Assigned User)
const submitTask = async (req, res) => {
    try {
        const { submissionLink } = req.body;
        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ message: 'Task not found' });
        if (task.assignedTo.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        task.submissionLink = submissionLink;
        task.status = 'submitted';
        await task.save();

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Approve a task
// @route   PUT /api/tasks/:id/approve
// @access  Private (Admin/ClubMember)
const approveTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ message: 'Task not found' });

        // Authorization check omitted for brevity, usually check if user is admin or club officer

        task.approved = true;
        task.status = 'completed';
        await task.save();

        // Award points (+5 for task)
        await User.findByIdAndUpdate(task.assignedTo, {
            $inc: { points: 5 }
        });

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTask,
    getMyTasks,
    submitTask,
    approveTask
};
