const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  submittedBy: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
// 2. Member Application Schema
const MemberSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  studentId: { type: String, required: true },
  department: String,
  year: String,
  reason: String,
  status: { type: String, default: 'Pending' }, // Pending, Approved, Rejected
  appliedAt: { type: Date, default: Date.now }
});

// 3. Community Idea Schema
const IdeaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = {
  Contact: mongoose.model('Contact', ContactSchema),
  Member: mongoose.model('Member', MemberSchema),
  Idea: mongoose.model('Idea', IdeaSchema)
};