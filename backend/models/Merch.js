const mongoose = require('mongoose');

const MerchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name for the merch'],
        trim: true,
        maxlength: [100, 'Name can not be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [1000, 'Description can not be more than 1000 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    category: {
        type: String,
        enum: ['T-Shirt', 'Hoodie', 'Cap', 'Accessory', 'Other'],
        default: 'T-Shirt'
    },
    sizes: {
        type: [String],
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        default: ['S', 'M', 'L', 'XL']
    },
    colors: {
        type: [String],
        default: []
    },
    image: {
        type: String,
        default: 'no-photo.jpg'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Merch', MerchSchema);
