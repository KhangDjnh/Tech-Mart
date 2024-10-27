const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
    id_user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',  // Tham chiếu đến model User (chủ sở hữu cửa hàng)
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    address: { 
        type: String, 
    },
    id_follower: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'  // Danh sách người theo dõi cửa hàng, tham chiếu đến model User
    }]
}, { timestamps: true }); 

module.exports = mongoose.model('Shop', ShopSchema);
