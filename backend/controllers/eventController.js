const Event = require('../models/Event');
const User = require('../models/User');

const cloudinary = require('cloudinary').v2;

// Configure Cloudinary (ensure you have CLOUDINARY_URL in .env or configure here)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Helper to upload buffer to Cloudinary
const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'wellness-club-events' },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        uploadStream.end(buffer);
    });
};

// @desc    Get all events
// @route   GET /api/events
// @access  Public
exports.getEvents = async (req, res) => {
    try {
        let query;

        // Copy req.query
        const reqQuery = { ...req.query };

        // Fields to exclude
        const removeFields = ['select', 'sort', 'page', 'limit'];

        // Loop over removeFields and delete them from reqQuery
        removeFields.forEach(param => delete reqQuery[param]);

        // Create query string
        let queryStr = JSON.stringify(reqQuery);

        // Create operators ($gt, $gte, etc)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

        // Finding resource
        query = Event.find(JSON.parse(queryStr));

        // Select Fields
        if (req.query.select) {
            const fields = req.query.select.split(',').join(' ');
            query = query.select(fields);
        }

        // Sort
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 100; // Default limit 100
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await Event.countDocuments();

        query = query.skip(startIndex).limit(limit);

        // Executing query
        const events = await query;

        // Pagination result
        const pagination = {};

        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            };
        }

        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            };
        }

        res.status(200).json({
            success: true,
            count: events.length,
            pagination,
            data: events
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
exports.getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ success: false, message: `Event not found with id of ${req.params.id}` });
        }

        res.status(200).json({ success: true, data: event });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const { logActivity } = require('../utils/logger');

// @desc    Create new event
// @route   POST /api/events
// @access  Private (Admin/Super Admin)
exports.createEvent = async (req, res) => {
    try {
        // Add user to req.body
        req.body.organizer = req.user.id;

        // Handle image upload if file is present
        let imageUrls = [];
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);
            imageUrls.push(result.secure_url);
        } else if (req.body.image) {
            // Handle case if string URL is passed via body (e.g. testing)
            imageUrls.push(req.body.image);
        }

        // Add images to body
        if (imageUrls.length > 0) {
            req.body.images = imageUrls;
        }

        const event = await Event.create(req.body);

        await logActivity('CREATE_EVENT', req.user._id, `Created event: ${event.title}`, req.ip);

        res.status(201).json({
            success: true,
            data: event
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private (Admin/Super Admin)
exports.updateEvent = async (req, res) => {
    try {
        let event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ success: false, message: `Event not found with id of ${req.params.id}` });
        }

        // Handle image upload if file is present
        if (req.file) {
            let resultUrl = await uploadImage(req.file);
            if (resultUrl.startsWith('/uploads')) {
                const protocol = req.protocol;
                const host = req.get('host');
                resultUrl = `${protocol}://${host}${resultUrl}`;
            }
            req.body.images = [resultUrl];
        }

        event = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        await logActivity('UPDATE_EVENT', req.user._id, `Updated event: ${event.title}`, req.ip);

        res.status(200).json({ success: true, data: event });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private (Admin/Super Admin)
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ success: false, message: `Event not found with id of ${req.params.id}` });
        }

        await event.deleteOne();

        await logActivity('DELETE_EVENT', req.user._id, `Deleted event: ${event.title}`, req.ip);

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
