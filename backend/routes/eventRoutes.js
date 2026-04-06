const express = require('express');
const {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
} = require('../controllers/eventController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');
const multer = require('multer');

// Configure multer for memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

router
    .route('/')
    .get(getEvents)
    .post(protect, authorize('admin', 'superadmin'), upload.single('image'), createEvent);

router
    .route('/:id')
    .get(getEvent)
    .put(protect, authorize('admin', 'superadmin'), upload.single('image'), updateEvent)
    .delete(protect, authorize('admin', 'superadmin'), deleteEvent);

module.exports = router;
