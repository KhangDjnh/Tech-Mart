const imageService = require('../services/ImageService');

exports.uploadImages = async (req, res) => {
  try {
    const images = req.files; 
    const modelType = req.body.modelType || 'uploads';
    const folder = `${modelType}s`;

    const uploadedImages = [];
    for (const file of images) {
      const uploadedImage = await imageService.uploadImage(file.path, folder);
      uploadedImages.push(uploadedImage);
    }
    res.status(200).json({ url: uploadedImages, message: 'Upload successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteImages = async (req, res) => {
  try {
    const { publicIds } = req.body;

    if (!publicIds || publicIds.length === 0) {
      return res.status(400).json({ error: 'No images provided for deletion' });
    }

    const deleteResults = [];
    for (const publicId of publicIds) {
      const deleteResult = await imageService.deleteImage(publicId);
      deleteResults.push(deleteResult);
    }

    res.status(200).json({ message: 'Images deleted successfully', results: deleteResults });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};