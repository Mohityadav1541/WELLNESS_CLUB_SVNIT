const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
    registerForEvent,
    getRegistrations,
    getMyRegistrations,
    updateRegistrationStatus,
    deleteRegistration
} = require('../controllers/registrationController');

router.post('/', registerForEvent);

// Protect all routes below
router.use(protect);

// User routes
router.get('/my', getMyRegistrations);

// Admin routes
router.use(authorize('Admin', 'Super Admin'));

router.route('/')
    .get(getRegistrations);

router.route('/:id')
    .put(updateRegistrationStatus)
    .delete(deleteRegistration);

module.exports = router;
