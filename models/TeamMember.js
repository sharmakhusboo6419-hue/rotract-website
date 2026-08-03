const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String },
    photoUrl: { type: String, required: true },
    bio: { type: String },
    year: { type: String, default: '2024-25' },
    category: {
      type: String,
      enum: ['leadership', 'member'],
      default: 'member'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.TeamMember || mongoose.model('TeamMember', teamMemberSchema);