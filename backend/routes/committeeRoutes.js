const express = require('express');
const {
    getCommittees,
    getCommittee,
    createCommittee,
    updateCommittee,
    deleteCommittee,
    addMember,
    removeMember,
    updateMemberRole,
    addMemberWithDetails,
    exportCommittee
} = require('../controllers/committeeController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Public routes (or protected based on need)
router.get('/', protect, authorize('admin', 'superadmin'), getCommittees);
router.get('/:id', protect, authorize('admin', 'superadmin'), getCommittee);

// Admin/SuperAdmin only
router.post('/', protect, authorize('admin', 'superadmin'), createCommittee);
router.put('/:id', protect, authorize('admin', 'superadmin'), updateCommittee);
router.delete('/:id', protect, authorize('admin', 'superadmin'), deleteCommittee);

// Member Management
router.post('/:id/members', protect, authorize('admin', 'superadmin'), addMember);
router.post('/:id/members/details', protect, authorize('admin', 'superadmin'), addMemberWithDetails); // New route
router.put('/:id/members/:userId', protect, authorize('admin', 'superadmin'), updateMemberRole);
router.delete('/:id/members/:userId', protect, authorize('admin', 'superadmin'), removeMember);
router.get('/:id/export', protect, authorize('admin', 'superadmin'), exportCommittee); // New route

module.exports = router;
