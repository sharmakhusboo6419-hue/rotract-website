const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Project = require('./models/Project');
const Member = require('./models/Member');

const app = express();

app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas!'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err.message));

// Basic Route
app.get('/', (req, res) => {
  res.send('Rotaract Backend API is running...');
});

/* ==================== PROJECTS API ==================== */
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const { title, category, description, submittedBy, email } = req.body;
    if (!title || !description || !submittedBy || !email) {
      return res.status(400).json({ error: 'Please fill in all required fields' });
    }
    const newProject = new Project({ title, category, description, submittedBy, email });
    await newProject.save();
    res.status(201).json({ message: 'Project submitted successfully!', project: newProject });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save project' });
  }
});

/* ==================== MEMBERS API ==================== */
app.get('/api/members', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: 1 });
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

app.post('/api/members', async (req, res) => {
  try {
    const { name, role, email, photoUrl, bio } = req.body;
    if (!name || !role || !photoUrl) {
      return res.status(400).json({ error: 'Name, role, and photo URL are required.' });
    }
    const newMember = new Member({ name, role, email, photoUrl, bio });
    await newMember.save();
    res.status(201).json({ message: 'Member added successfully!', member: newMember });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add member' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
