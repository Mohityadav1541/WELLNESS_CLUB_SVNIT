const Log = require('../models/Log');

const logActivity = async (action, userId, details, ip) => {
    try {
        await Log.create({
            action,
            user: userId,
            details,
            ip
        });
    } catch (error) {
        console.error('Failed to create system log:', error);
    }
};

module.exports = { logActivity };
