const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Đăng ký
const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'Đăng ký thành công' });
    } catch (err) {
        res.status(400).json({ message: 'Lỗi đăng ký', error: err.message });
    }
};

// Đăng nhập
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Sai thông tin đăng nhập' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Đăng nhập thành công', token });
    } catch (err) {
        res.status(400).json({ message: 'Lỗi đăng nhập', error: err.message });
    }
};

module.exports = { register, login };
