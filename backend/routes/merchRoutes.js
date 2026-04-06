const express = require('express');
const {
    getAllMerch,
    getMerch,
    createMerch,
    updateMerch,
    deleteMerch,
    createOrder,
    getAllOrders,
    getMyOrders,
    updateOrderStatus
} = require('../controllers/merchController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getAllMerch);
router.get('/:id', getMerch);

// Protected routes
router.post('/order', protect, createOrder);
router.get('/myorders', protect, getMyOrders);

// Admin routes
router.post('/', protect, authorize('admin', 'superadmin'), createMerch);
router.put('/:id', protect, authorize('admin', 'superadmin'), updateMerch);
router.delete('/:id', protect, authorize('admin', 'superadmin'), deleteMerch);
router.get('/orders/all', protect, authorize('admin', 'superadmin'), getAllOrders);
router.put('/orders/:id', protect, authorize('admin', 'superadmin'), updateOrderStatus);

module.exports = router;
