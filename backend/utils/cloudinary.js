const dotenv = require("dotenv");
dotenv.config();

const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const modelType = req.body.modelType || 'uploads'; // Nhận modelType từ body
    return {
      folder: `${modelType}s`, // Tên thư mục trên Cloudinary
      allowed_formats: ['jpg', 'png', 'jpeg'],
    };
  },
});

const upload = multer({ storage });
// storage là CloudinaryStorage không phải RAM => Tức là đã upload ở tầng middleware 

module.exports = { cloudinary, upload };