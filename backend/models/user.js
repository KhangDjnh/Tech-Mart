const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    phonenumber: { 
        type: String, 
        required: true 
    },
    gender: { 
        type: String, 
        enum: ['Male', 'Female', 'Other'] 
    },
    birthday: { 
        type: Date 
    },
    role: { 
        type: [String], 
        enum: ['shop', 'buyer', 'admin'], 
        default: ['shop', 'buyer']  
    },
    profilePic: { 
        type: String 
    },
    coverPic: { 
        type: String 
    },
    id_following: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Follow' 
    }]
>>>>>>> 035ffc4e8a155fc697e84ff6086826eadeef712b
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
