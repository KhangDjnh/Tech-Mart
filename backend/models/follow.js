const mongoose = require('mongoose');

const FollowSchema = new mongoose.Schema({
    id_user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',  
        required: true 
    },
    id_shop: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Shop',   
        required: true 
    }
}, { timestamps: true });  

module.exports = mongoose.model('Follow', FollowSchema);
