// controllers/uploadController.js
const cloudinary = require('../config/cloudinary');

const uploadImage = async (req, res) => {
  try {
    // Check if the file is uploaded
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    // Access the uploaded image
    const imageFile = req.files.image;

    // Use Cloudinary's upload() method (works directly with a Buffer)
    cloudinary.uploader.upload_stream(
      {
        folder: 'user_images',  // Optional: specify a folder name
        use_filename: true,     // Optional: keep original file name
        unique_filename: true,  // Optional: generate a unique file name
      },
      (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Error uploading image to Cloudinary', error: error.message });
        }

        // Return the Cloudinary URL of the uploaded image
        return res.status(200).json({
          message: 'Image uploaded successfully',
          imageUrl: result.secure_url,  // Cloudinary image URL
        });
      }
    ).end(imageFile.data);  // Send the image data buffer directly to Cloudinary
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading image to Cloudinary', error: error.message });
  }
};

module.exports = { uploadImage };
