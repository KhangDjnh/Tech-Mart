const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    participants: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',  // Tham chiếu đến model User 
        required: true,
        unique: true
    }],
    lastMessage: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Message' 
    }
}, { timestamps: true }); 

module.exports = mongoose.model('Conversation', ConversationSchema);
