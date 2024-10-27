const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },       
    phonenumber: { type: String, required: true },              
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },  
    birthday: { type: Date },                           
    role: { type: String, enum: ['buyer', 'seller', 'admin'], default: 'buyer' }, 
    profilePic: { type: String },                     
    coverPic: { type: String },                  
    id_following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Follow' }],
}, { timestamps: true });

// Hàm mã hóa mật khẩu trước khi lưu
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('User', UserSchema);
