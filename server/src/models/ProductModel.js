const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: {
            type: String,
            required: true,
        },
        type: { type: String, required: true },
        price: { type: Number, required: true },
        countInStock: { type: Number, default: 0 },
        rating: { type: Number, required: true, default: -1 },
        description: { type: String, required: true },
        selled: { type: Number, default: 0 },
        discountprice: { type: Number, default: 0 },
        brand: { type: String, default: 'Chưa xác định' },
    },
    {
        timestamps: true,
    },
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
