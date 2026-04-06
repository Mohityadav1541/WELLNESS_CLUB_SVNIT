const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [5000, 'Description cannot be more than 5000 characters']
    },
    date: {
        type: Date,
        required: [true, 'Please add a date']
    },
    time: {
        type: String,
        required: [true, 'Please add a time']
    },
    location: {
        type: String,
        required: [true, 'Please add a location']
    },
    category: {
        type: String,
        enum: ['Wellness', 'Workshop', 'Seminar', 'Competition', 'Cultural', 'Sports', 'Other'],
        default: 'Other'
    },
    tags: {
        type: [String],
        default: []
    },
    image: {
        type: String,
        default: 'no-photo.jpg'
    },
    images: {
        type: [String],
        default: []
    },
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'closed'],
        default: 'upcoming'
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    registrationLimit: {
        type: Number,
        default: 0 // 0 means unlimited
    },
    registeredCount: {
        type: Number,
        default: 0
    },
    organizer: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Create event slug from the name (optional, but good for SEO)
// eventSchema.pre('save', function(next) {
//   this.slug = slugify(this.title, { lower: true });
//   next();
// });

// Virtual to check if registration is open
eventSchema.virtual('isRegistrationOpen').get(function () {
    return this.status === 'upcoming' || this.status === 'ongoing';
});

module.exports = mongoose.model('Event', eventSchema);
