const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, default: 'General' },
  description: { type: String, required: true },
  submittedBy: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Project || mongoose.model('Project', projectSchema);
