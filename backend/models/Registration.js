const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    eventId: {
        type: String,
        required: true
    },
    eventTitle: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    admissionNumber: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    whatsapp: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    attended: {
        type: Boolean,
        default: false
    },
    registrationDate: {
        type: Date,
        default: Date.now
    }
});

// Prevent duplicate registration for same event
registrationSchema.index({ eventId: 1, admissionNumber: 1 }, { unique: true });
registrationSchema.index({ eventId: 1, email: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);
