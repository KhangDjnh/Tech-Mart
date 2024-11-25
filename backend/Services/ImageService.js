const { cloudinary } = require('../utils/cloudinary');

exports.uploadImage = async (filePath, folder) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
    });
    return result.secure_url; // Trả về link ảnh sau khi upload
  } catch (err) {
    throw new Error(`Upload image failed: ${err.message}`);
  }
};

exports.deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== 'ok') {
      throw new Error(`Failed to delete image: ${publicId}`);
    }
    return { success: true };
  } catch (err) {
    throw new Error(`Delete image failed: ${err.message}`);
  }
};
