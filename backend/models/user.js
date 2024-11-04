const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8, maxlength: 1024},   
    email: { type: String, required: true, unique: true },
    emailConfirmed: {type: Boolean, default: flase},        
    phonenumber: { type: String, required: true },              
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },  
    birthday: { type: Date },                           
    role: { type: String, enum: ['buyer', 'seller', 'admin'], default: 'buyer' }, 
    profilePic: { type: String },                     
    coverPic: { type: String },                     
    id_following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Follow' }],
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
