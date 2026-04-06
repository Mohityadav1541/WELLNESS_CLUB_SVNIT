const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    action: {
        type: String,
        required: true,
        enum: [
            'LOGIN', 'REGISTER',
            'CREATE_EVENT', 'DELETE_EVENT', 'UPDATE_EVENT',
            'DELETE_USER', 'PROMOTE_USER',
            'SYSTEM_ERROR', 'VIEW_LOGS',
            'CREATE_COMMITTEE', 'UPDATE_COMMITTEE', 'DELETE_COMMITTEE',
            'ADD_MEMBER', 'REMOVE_MEMBER', 'UPDATE_MEMBER_ROLE',
            'ADD_MEMBER_DETAILS', 'EXPORT_COMMITTEE'
        ]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // System errors might not have a user
    },
    details: {
        type: String,
        required: true
    },
    ip: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 24 * 30 // Auto-delete logs after 30 days
    }
});

module.exports = mongoose.model('Log', LogSchema);
