const dotenv = require("dotenv");
dotenv.config();

const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({ 
    cloud_name: 'djhnuocm0', 
    api_key: '785965933447659', 
    api_secret: '0gD6YjLErOOLkLVR_uEwHDXBskQ' 
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'uploads', // Tên thư mục trên Cloudinary
      allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };