const path = require('path');
const fs = require('fs');

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');

const Project = require('./models/Project.js');
const Member = require('./models/Member.js');
const Photo = require('./models/Photo.js');
const { teamMembers, membersList } = require('./seed-data/members-data');
const { facultyList } = require('./seed-data/faculty-data');

// Achievements storage (in-memory for simplicity)
const achievements = [];

// Multer config for achievements photo uploads
const achievementsStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'public/uploads')),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${Date.now()}-${safeName}`);
  }
});
const achievementsUpload = multer({ storage: achievementsStorage, limits: { fileSize: 10 * 1024 * 1024 } });

const app = express();

// Multer middleware FIRST (handles FormData and populates req.body)
app.use(achievementsUpload);

// Then JSON middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Ensure public/uploads folder exists locally
const uploadDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Achievements routes
app.post('/api/achievements', (req, res) => {
  const body = req.body || {};
  const { title, description, category } = body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required.' });
  }
  const photoUrls = req.files ? req.files.map(f => `/uploads/${f.filename}`) : '';
  const achievement = {
    id: achievements.length + 1,
    title,
    description,
    category: category || 'General',
    photoUrls,
    createdAt: new Date()
  };
  achievements.push(achievement);
  res.status(201).json({ message: 'Achievement submitted successfully!', achievement });
});

// GET: Fetch all achievements
app.get('/api/achievements', (req, res) => {
  res.json(achievements);
});

// ... rest of the routes would follow
// (Member, Faculty, Projects routes would follow here)

const appEnv = 'development'; // or 'production'
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;
