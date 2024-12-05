const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    id_conversation: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Conversation', 
        required: true 
    },
    sender: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }, 
    receiver: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }, 
    content: {
        type: String,
    },
    messImages:[{
        type: String,
    }],
    read: {
        type: Boolean, 
        default: false 
    }
}, { timestamps: true }); 

module.exports = mongoose.model('Message', MessageSchema);
