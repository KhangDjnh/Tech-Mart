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
    let folder;
    // Xác định thư mục dựa trên fieldname của file
    if (file.fieldname === 'profilePic') {
      folder = 'TechMart-User'; // Thư mục cho ảnh profile
    } else if (file.fieldname === 'coverPic') {
      folder = 'TechMart-Cover-User'; // Thư mục cho ảnh cover
    } else if (file.fieldname === 'images') {
      folder = 'TechMart-Product'; // Thư mục cho ảnh sản phẩm
    } else if (file.fieldname === 'avatar') {
      folder = 'TechMart-Shop'; // Thư mục cho ảnh avatar shop
    } else if (file.fieldname === 'cover') {
      folder = 'TechMarket-Shop-Cover'; // Thư mục cho ảnh cover-shop
    } else if (file.fieldname === 'messImage') {
      folder = 'TechMarket-Message'; // Thư mục cho ảnh mess
    } else {
      folder = 'TechMart-Others'; // Thư mục mặc định nếu không phải là các trường trên
    }
    return {
      folder: folder, // Tên thư mục trên Cloudinary
      allowed_formats: ['jpg', 'png', 'jpeg'],
    };
  },
});

const upload = multer({ storage });
// storage là CloudinaryStorage không phải RAM => Tức là đã upload ở tầng middleware 

module.exports = { cloudinary, upload };