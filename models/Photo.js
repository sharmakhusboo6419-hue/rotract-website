const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  title: { type: String, default: 'Event Photo' },
  caption: { type: String, default: '' },
  imageUrl: { type: String, required: true },
  event: { type: String, default: '' },
  uploadedBy: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Photo || mongoose.model('Photo', photoSchema);