// routes/uploadRoutes.js
const express = require('express');
const { uploadImage } = require('../controllers/uploadController');
const router = express.Router();

// Middleware to handle file uploads (using `express-fileupload`)
const fileUpload = require('express-fileupload');

// Use express-fileupload middleware
router.use(fileUpload());

/**
 * @swagger
 * /api/upload/upload:
 *   post:
 *     summary: Upload an image to Cloudinary
 *     description: Allows a user to upload an image to Cloudinary.
 *     tags:
 *       - Upload
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file to be uploaded.
 *     responses:
 *       200:
 *         description: Image uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 imageUrl:
 *                   type: string
 *                   description: The URL of the uploaded image.
 *       400:
 *         description: Bad request. No image file uploaded.
 *       500:
 *         description: Error uploading image to Cloudinary.
 */
router.post('/upload', uploadImage);

module.exports = router;
