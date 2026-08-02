const mongoose = require('mongoose');
require('dotenv').config();
const Project = require('./models/Project');

async function seedSWARA() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const swaraProject = new Project({
      title: "SWARA – Gynaecologist Speaker Session",
      category: "Community Health & Awareness",
      description: "Rotaract Club of Presidency College inaugurated SWARA 2025, a 9-day movement dedicated to spreading awareness and promoting menstrual hygiene, with an enlightening Speaker Session on Menstrual Hygiene conducted by Dr. Meenakshi Bharat.",
      submittedBy: "Rotaract Club of Presidency College",
      email: "rotaract@presidency.edu.in"
    });

    await swaraProject.save();
    console.log("✅ SWARA 2025 Project successfully added to MongoDB!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding project:", err.message);
    process.exit(1);
  }
}

seedSWARA();
