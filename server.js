const path = require('path');
const fs = require('fs');
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import models (ensure these files exist in your ./models directory)
const Photo = require('./models/Photo.js');
const Project = require('./models/Project.js');
const Member = require('./models/Member.js');

const app = express();

// Increase JSON limit to handle Base64 image uploads from gallery.html
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

// Serve static files from 'public' (or current directory)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '.')));

// Database Connection Setup
const MONGO_URI = process.env.MONGO_URI;
let cached = global.mongoose || { conn: null, promise: null };

async function connectDB() {
  if (!MONGO_URI) {
    console.warn('⚠️ MONGO_URI is not set in environment variables.');
    return null;
  }
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, { bufferCommands: false }).then((m) => {
      console.log('✅ Connected to MongoDB Atlas!');
      return m;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    console.error('❌ MongoDB Connection Error:', err);
  }
  return cached.conn;
}

// In-memory fallback for achievements if DB is not used
const achievements = [
  { id: 1, title: 'Best Rotaract Club 2025', description: 'Awarded for overall excellence in community service.', category: 'Awards', createdAt: new Date() }
];

// ==================== FRONTEND ROUTES ====================

// Fix: Serve index.html instead of plain text string on root access
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Dynamic route for clean URLs (e.g., /gallery serves gallery.html)
app.get('/:page', (req, res, next) => {
  const pageName = req.params.page;
  if (pageName.startsWith('api')) return next();

  const filePath = path.join(__dirname, `${pageName}.html`);
  res.sendFile(filePath, (err) => {
    if (err) next();
  });
});

// ==================== API ROUTES ====================

// Health check route
app.get('/api/health', async (req, res) => {
  try {
    await connectDB();
    res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
  } catch (err) {
    res.json({ status: 'ok', database: 'disconnected' });
  }
});

// GET: Achievements
app.get('/api/achievements', (req, res) => {
  res.json(achievements);
});

// POST: Add Achievement
app.post('/api/achievements', (req, res) => {
  const body = req.body || {};
  const { title, description, category } = body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description required' });
  }
  const achievement = {
    id: achievements.length + 1,
    title,
    description,
    category: category || 'General',
    createdAt: new Date()
  };
  achievements.push(achievement);
  res.status(201).json({ message: 'Achievement submitted!', achievement });
});

// GET: Gallery Photos
app.get('/api/photos', async (req, res) => {
  try {
    await connectDB();
    if (mongoose.connection.readyState === 1) {
      const photos = await Photo.find().sort({ createdAt: -1 });
      return res.json(photos);
    }
    res.json([]);
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ error: 'Failed to retrieve photos' });
  }
});

// POST: Upload Gallery Photo (Base64 Data String)
app.post('/api/photos', async (req, res) => {
  try {
    await connectDB();
    const { title, caption, imageUrl, event, uploadedBy } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: 'Image URL or Base64 data is required.' });
    }

    const newPhoto = new Photo({
      title: title || 'Event Photo',
      caption: caption || '',
      imageUrl,
      event: event || '',
      uploadedBy: uploadedBy || ''
    });

    await newPhoto.save();
    res.status(201).json({ message: 'Photo uploaded successfully!', photo: newPhoto });
  } catch (error) {
    console.error('Error saving photo:', error);
    res.status(500).json({ error: 'Failed to upload photo to MongoDB' });
  }
});

// GET: Fetch Projects
app.get('/api/projects', async (req, res) => {
  try {
    await connectDB();
    if (mongoose.connection.readyState === 1) {
      const projects = await Project.find().sort({ createdAt: -1 });
      return res.json(projects);
    }
    res.json([]);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to retrieve projects' });
  }
});

// POST: Submit Project Proposal
app.post('/api/projects', async (req, res) => {
  try {
    await connectDB();
    const { title, category, description, submittedBy, email } = req.body;

    if (!title || !description || !submittedBy || !email) {
      return res.status(400).json({ error: 'Title, description, submitter name, and email are required.' });
    }

    const newProject = new Project({
      title,
      category: category || 'General',
      description,
      submittedBy,
      email
    });

    await newProject.save();
    res.status(201).json({ message: 'Project proposal submitted successfully!', project: newProject });
  } catch (error) {
    console.error('Error submitting project:', error);
    res.status(500).json({ error: 'Failed to submit project proposal' });
  }
});

// POST: Register New Club Member
app.post('/api/join', async (req, res) => {
  try {
    await connectDB();
    const { name, email, phone, interests, reason } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone number are required.' });
    }

    const existingMember = await Member.findOne({ email });
    if (existingMember) {
      return res.status(409).json({ error: 'A member with this email address is already registered.' });
    }

    const newMember = new Member({
      name,
      email,
      phone,
      interests: interests || 'General',
      reason: reason || ''
    });

    await newMember.save();
    res.status(201).json({ message: 'Welcome to Rotaract! Registration submitted successfully.', member: newMember });
  } catch (error) {
    console.error('Error registering member:', error);
    res.status(500).json({ error: 'Failed to complete registration' });
  }
});

// POST: Contact Form Submission
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }
  console.log(`📩 New Contact Message from ${name} (${email}): ${message}`);
  res.status(200).json({ message: 'Thank you for reaching out! We will get back to you soon.' });
});

// Start Server locally or export for Vercel
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Local Server running on port ${PORT}`);
  });
}

module.exports = app;