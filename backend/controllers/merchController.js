const Merch = require('../models/Merch');
const MerchOrder = require('../models/MerchOrder');
const { logActivity } = require('../utils/logger');

// @desc    Get all active merch
// @route   GET /api/merch
// @access  Public
exports.getAllMerch = async (req, res) => {
    try {
        const merch = await Merch.find({ isActive: true }).sort('-createdAt');
        res.status(200).json({ success: true, count: merch.length, data: merch });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single merch
// @route   GET /api/merch/:id
// @access  Public
exports.getMerch = async (req, res) => {
    try {
        const merch = await Merch.findById(req.params.id);
        if (!merch) {
            return res.status(404).json({ success: false, message: 'Merch not found' });
        }
        res.status(200).json({ success: true, data: merch });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create new merch
// @route   POST /api/merch
// @access  Private (Admin/SuperAdmin)
exports.createMerch = async (req, res) => {
    try {
        const merch = await Merch.create(req.body);
        await logActivity('CREATE_MERCH', req.user._id, `Created merch: ${merch.name}`, req.ip);
        res.status(201).json({ success: true, data: merch });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update merch
// @route   PUT /api/merch/:id
// @access  Private (Admin/SuperAdmin)
exports.updateMerch = async (req, res) => {
    try {
        let merch = await Merch.findById(req.params.id);
        if (!merch) {
            return res.status(404).json({ success: false, message: 'Merch not found' });
        }

        merch = await Merch.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        await logActivity('UPDATE_MERCH', req.user._id, `Updated merch: ${merch.name}`, req.ip);
        res.status(200).json({ success: true, data: merch });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete merch (Soft delete)
// @route   DELETE /api/merch/:id
// @access  Private (Admin/SuperAdmin)
exports.deleteMerch = async (req, res) => {
    try {
        const merch = await Merch.findById(req.params.id);
        if (!merch) {
            return res.status(404).json({ success: false, message: 'Merch not found' });
        }

        merch.isActive = false; // Soft delete
        await merch.save();

        await logActivity('DELETE_MERCH', req.user._id, `Deactivated merch: ${merch.name}`, req.ip);
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Place an order
// @route   POST /api/merch/order
// @access  Private
exports.createOrder = async (req, res) => {
    try {
        const { merchId, size, quantity } = req.body;

        const merch = await Merch.findById(merchId);
        if (!merch) {
            return res.status(404).json({ success: false, message: 'Merch item not found' });
        }

        const totalAmount = merch.price * (quantity || 1);

        const order = await MerchOrder.create({
            user: req.user._id,
            merch: merchId,
            size,
            quantity: quantity || 1,
            totalAmount
        });

        await logActivity('CREATE_ORDER', req.user._id, `Placed order for ${merch.name}`, req.ip);
        res.status(201).json({ success: true, data: order });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get all orders (Admin)
// @route   GET /api/merch/orders
// @access  Private (Admin/SuperAdmin)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await MerchOrder.find()
            .populate('user', 'name email admissionNumber whatsappNumber')
            .populate('merch', 'name price')
            .sort('-createdAt');

        res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get my orders
// @route   GET /api/merch/myorders
// @access  Private
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await MerchOrder.find({ user: req.user._id })
            .populate('merch', 'name price image')
            .sort('-createdAt');

        res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update order status
// @route   PUT /api/merch/orders/:id
// @access  Private (Admin/SuperAdmin)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await MerchOrder.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        order.status = status;
        await order.save();

        await logActivity('UPDATE_ORDER_STATUS', req.user._id, `Updated order status to ${status}`, req.ip);
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
