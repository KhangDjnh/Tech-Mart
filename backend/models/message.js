const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    id_conversation: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Conversation', 
        required: true 
    },
    content: {
        type: String,
        required: true
    },
    id_user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',  // Người dùng gửi tin nhắn
        required: function() {
            return !this.id_shop;  // Bắt buộc nếu không có id_shop
        }
    },
    id_shop: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Shop',  // Cửa hàng gửi tin nhắn
        required: function() {
            return !this.id_user;  // Bắt buộc nếu không có id_user
        }
    },
    read: {
        type: Boolean, 
        default: false 
    }
}, { timestamps: true }); 

module.exports = mongoose.model('Message', MessageSchema);
