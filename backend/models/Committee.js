const mongoose = require('mongoose');

const committeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a committee name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description can not be more than 500 characters']
    },
    members: [{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        },
        role: {
            type: String,
            enum: ['Head', 'Co-Head', 'Member'],
            default: 'Member'
        },
        joinedAt: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Prevent duplicate members in same committee
committeeSchema.index({ "members.user": 1, "_id": 1 }, { unique: true });

module.exports = mongoose.model('Committee', committeeSchema);
