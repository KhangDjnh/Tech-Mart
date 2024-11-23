const imageService = require('../Services/ImageService');

exports.uploadImage = async (req, res) => {
  try {
    const imageUrl = req.file.path; 
    const folder = req.body.folder || 'uploads'; 
    const uploadedImage = await uploadService.uploadImage(imageUrl, folder);
    res.status(200).json({ url: uploadedImage, message: 'Upload successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { publicId } = req.body; 
    await uploadService.deleteImage(publicId);
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
