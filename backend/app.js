const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.js');
const cors = require('cors');

require('dotenv').config();

const productRoutes = require('./routes/product.js');

const app = express();

// Middleware
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());

// Kết nối MongoDB
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Đã kết nối thành công với MongoDB Atlas'))
    .catch(err => console.log('Lỗi kết nối:', err));

// Định nghĩa các route
app.get('/', (req, res) => {
    res.send('API đang hoạt động');
});

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng http://localhost:${PORT}`);
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
