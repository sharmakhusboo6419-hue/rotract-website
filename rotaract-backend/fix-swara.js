const mongoose = require('mongoose');
require('dotenv').config();
const Project = require('./models/Project');

async function fixSwara() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas...");

    // 1. Delete all existing SWARA entries (including case variations)
    const deleteResult = await Project.deleteMany({ 
      title: { $regex: /swara/i } 
    });
    console.log(`🗑️ Removed ${deleteResult.deletedCount} existing SWARA entry/entries.`);

    // 2. Insert SWARA exactly once
    const singleSwara = new Project({
      title: "SWARA – Gynaecologist Speaker Session & Awareness Drive",
      category: "Community Health & Awareness",
      description: "SWARA was a 9-day movement dedicated to breaking taboos and promoting menstrual hygiene awareness. It featured a poster-making competition, quiz competition, photo booth, and an enlightening Speaker Session conducted by Dr. Meenakshi Bharat.",
      submittedBy: "Rotaract Club of Presidency College",
      email: "rotaract@presidency.edu.in"
    });

    await singleSwara.save();
    console.log("✨ Added SWARA project successfully (Single Entry)!");

    process.exit();
  } catch (err) {
    console.error("❌ Error fixing SWARA entries:", err.message);
    process.exit(1);
  }
}

fixSwara();
