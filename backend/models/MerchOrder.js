const mongoose = require('mongoose');

const MerchOrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    merch: {
        type: mongoose.Schema.ObjectId,
        ref: 'Merch',
        required: true
    },
    size: {
        type: String,
        required: [true, 'Please select a size']
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1
    },
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Paid', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('MerchOrder', MerchOrderSchema);
