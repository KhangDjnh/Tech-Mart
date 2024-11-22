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
    address: { 
        type: String, 
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
        enum: ['customer','employee', 'manager'], 
        default: ['customer','employee']  
    },
    profilePic: { 
        type: String 
    },
    coverPic: { 
        type: String 
    },
    // customers: [{ 
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'User',
    //     default: []
    // }],
    id_following: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Shop' 
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
