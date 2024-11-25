const express = require('express');
const router = express.Router();
const { uploadImages, deleteImages } = require('../controllers/ImageController');
const { upload } = require('../utils/cloudinary');

router.post('/upload', upload.array('images', 10), uploadImages); // Cho phép upload tối đa 10 ảnh
router.delete('/delete', deleteImages);

module.exports = router;

