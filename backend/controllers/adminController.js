const User = require('../models/User');
const Event = require('../models/Event');
const Registration = require('../models/Registration'); // Assuming you have this
const Log = require('../models/Log');
const { logActivity } = require('../utils/logger');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Super Admin
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create a user (Admin/Student)
// @route   POST /api/admin/users
// @access  Super Admin
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const user = await User.create({
            name,
            email,
            password, // Hashing handled in User model
            role,
            isActive: true
        });

        await logActivity('REGISTER', req.user._id, `Created user ${email} with role ${role}`, req.ip);

        res.status(201).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Super Admin
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Prevent deleting self
        if (user._id.toString() === req.user._id.toString()) {
            return res.status(400).json({ success: false, message: 'Cannot delete yourself' });
        }

        await user.deleteOne();
        await logActivity('DELETE_USER', req.user._id, `Deleted user ${user.email}`, req.ip);

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get System Logs
// @route   GET /api/admin/logs
// @access  Super Admin
exports.getSystemLogs = async (req, res) => {
    try {
        const logs = await Log.find()
            .populate('user', 'name email role')
            .sort({ createdAt: -1 })
            .limit(100); // Limit to last 100 logs

        res.status(200).json({ success: true, count: logs.length, data: logs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get Analytics
// @route   GET /api/admin/analytics
// @access  Super Admin
exports.getAnalytics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalEvents = await Event.countDocuments();
        const totalRegistrations = await Registration.countDocuments();

        // New Users Last 7 Days (Example)
        const last7Days = new Date();
        last7Days.setDate(last7Days.getDate() - 7);
        const newUsers = await User.countDocuments({ createdAt: { $gte: last7Days } });

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalEvents,
                totalRegistrations,
                newUsers
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
