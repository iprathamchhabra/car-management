const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  tags: [String],
  images: [String], // Array of image URLs
}, { timestamps: true });

module.exports = mongoose.model('Car', CarSchema);
