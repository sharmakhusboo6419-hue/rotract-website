const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true }, // e.g., "President", "Community Service Director"
    email: { type: String },
    photoUrl: { type: String, required: true },
    bio: { type: String },
    year: { type: String, default: '2024-25' },
    category: {
      type: String,
      enum: ['leadership', 'member'],
      default: 'member',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Member', memberSchema);
