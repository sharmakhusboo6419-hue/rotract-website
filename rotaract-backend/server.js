const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Project = require('./models/Project');
const Member = require('./models/Member');

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());

// ==================== MEMBER ROUTES ====================

// GET: Fetch all team members for contact.html / leadership slider
app.get('/api/members', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected yet' });
    }

    const members = await Member.find();
    res.status(200).json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

// ==================== PROJECT ROUTES ====================

// GET: Fetch all projects
app.get('/api/projects', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected yet' });
    }

    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects from database' });
  }
});

// POST: Submit a new project idea
app.post('/api/projects', async (req, res) => {
  try {
    const { title, category, description, submittedBy, email } = req.body;
    
    if (!title || !description || !submittedBy || !email) {
      return res.status(400).json({ error: 'Please fill in all required fields' });
    }

    const newProject = new Project({ title, category, description, submittedBy, email });
    await newProject.save();

    res.status(201).json({ message: 'Project idea submitted successfully!', project: newProject });
  } catch (error) {
    console.error('Error saving project:', error);
    res.status(500).json({ error: 'Failed to save project idea' });
  }
});

// ==================== CONTACT ROUTE ====================

// POST: Handle contact form submissions
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    console.log('📩 New Contact Submission:', { name, email, subject, message });

    res.status(200).json({ message: 'Message received successfully!' });
  } catch (error) {
    console.error('Error handling contact form:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'connecting'
  });
});

// Server Initialization
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log('✅ Connected to MongoDB Atlas!');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
    });
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

startServer();