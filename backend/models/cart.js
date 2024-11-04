const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    id_user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',  // Tham chiếu đến model User (chủ sở hữu cart)
        required: true 
    },
    id_product: [{ 
        product: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product',  // Tham chiếu đến model Product (sản phẩm trong giỏ hàng)
            required: true 
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,  // Số lượng tối thiểu là 1
            max: 10  // Số lượng tối đa là 10
        }
    }],
}, { timestamps: true }); 

module.exports = mongoose.model('Cart', CartSchema);
