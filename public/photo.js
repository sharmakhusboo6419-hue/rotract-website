const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  title: { type: String, default: 'Event Photo' },
  caption: { type: String, default: '' },
  imageUrl: { type: String, required: true },
  uploadedBy: { type: String, default: 'Member' }
}, { timestamps: true });

module.exports = mongoose.models.Photo || mongoose.model('Photo', photoSchema);