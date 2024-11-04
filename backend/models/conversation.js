const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    id_user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',  // Tham chiếu đến model User 
        required: true 
    },
    
    id_shop: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Shop'  // Tham chiếu đến Shop
    }
}, { timestamps: true }); 

module.exports = mongoose.model('Conversation', ConversationSchema);
