const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    id_user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',  // Tham chiếu đến model User (chủ sở hữu đơn hàng)
        required: true 
    },
    id_product: [{ 
        product: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product',  // Tham chiếu đến model Product (sản phẩm trong đơn hàng)
            required: true 
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,  // Số lượng tối thiểu là 1
            max: 10  // Số lượng tối đa là 10
        }
    }],
    shipping: { type: Object, required: true },
    paymentIntentId: { type: String },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, required: true },
    total_price: {
        type: Number,
        required: true,
        min: 0  // Giá trị tối thiểu là 0 để tránh giá trị âm
    },
    status: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'canceled']
    },
    address: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    }
}, { timestamps: true }); 

module.exports = mongoose.model('Order', OrderSchema);
