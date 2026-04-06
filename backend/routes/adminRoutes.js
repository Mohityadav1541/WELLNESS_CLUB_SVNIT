const express = require('express');
const {
    getAllUsers,
    createUser,
    deleteUser,
    getSystemLogs,
    getAnalytics
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes are protected and for Super Admin only
router.use(protect);
router.use(authorize('superadmin'));

router.route('/users')
    .get(getAllUsers)
    .post(createUser);

router.route('/users/:id')
    .delete(deleteUser);

router.route('/logs')
    .get(getSystemLogs);

router.route('/analytics')
    .get(getAnalytics);

module.exports = router;
