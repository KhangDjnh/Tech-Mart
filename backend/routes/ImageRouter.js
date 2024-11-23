const express = require('express');
const router = express.Router();
const { uploadImage, deleteImage } = require('../controllers/ImageController');
const { upload } = require('../utils/cloudinary');

router.post('/upload', upload.single('image'), uploadImage);
router.delete('/delete', deleteImage);

module.exports = router;

