const path = require('path');

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Project = require('./models/Project.js');
const Member = require('./models/Member.js');
const { teamMembers, membersList } = require('./seed-data/members-data');

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

const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', teamMemberSchema);

const LEGACY_PHOTO_MAP = {
  'IMG-20260610-WA0007.jpg (1).jpeg': '/images/avnish-kumar.jpeg',
  'IMG_20260803_225704.jpg (1).jpeg': '/images/deepak-kumar-barik.jpeg',
  'IMG-20260609-WA0452.jpg (1).jpeg': '/images/sibhi-solanki.jpeg',
  'C8A4CDD4-C593-41DB-A574-4F7A4F43AFF8_Original.jpg (1).jpeg': '/images/kaneez-fatima.jpeg',
  'Noor ji .jpg (1).jpeg': '/images/noor-hoorain.jpeg',
  '3F8DD29C-CEFC-47FA-AAB1-8906143AB416.JPG (1).jpeg': '/images/vani-ray.jpeg'
};

function normalizePhotoUrl(photoUrl) {
  if (!photoUrl || typeof photoUrl !== 'string') {
    return photoUrl;
  }

  if (photoUrl.startsWith('/images/') || photoUrl.startsWith('http://') || photoUrl.startsWith('https://')) {
    return photoUrl;
  }

  const fileName = path.basename(photoUrl);
  return LEGACY_PHOTO_MAP[fileName] || photoUrl;
}

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('MONGO_URI is not set. Check .env or define it in the environment.');
}

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas!'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

app.get('/api/members', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json([...teamMembers, ...membersList].map((member) => ({
        ...member,
        photoUrl: normalizePhotoUrl(member.photoUrl)
      })));
    }

    const members = await TeamMember.find().sort({ createdAt: -1 });
    const normalizedMembers = members.map((member) => ({
      ...member.toObject(),
      photoUrl: normalizePhotoUrl(member.photoUrl)
    }));

    if (!normalizedMembers.length) {
      return res.json([...teamMembers, ...membersList].map((member) => ({
        ...member,
        photoUrl: normalizePhotoUrl(member.photoUrl)
      })));
    }

    res.json(normalizedMembers);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ error: 'Failed to retrieve members' });
  }
});

app.post('/api/members', async (req, res) => {
  try {
    const { name, role, email, photoUrl, bio, year, category } = req.body;

    if (!name || !role || !photoUrl) {
      return res.status(400).json({ error: 'Name, role, and photo URL are required.' });
    }

    const newMember = new TeamMember({
      name,
      role,
      email,
      photoUrl: normalizePhotoUrl(photoUrl),
      bio,
      year,
      category: category || 'member'
    });

    await newMember.save();
    res.status(201).json({ message: 'Member saved successfully!', member: newMember });
  } catch (error) {
    console.error('Error saving member:', error);
    res.status(500).json({ error: 'Failed to save member' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'connecting'
  });
});

// ==================== API ROUTES ====================

// 1. GET: Fetch all active projects
app.get('/api/projects', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database initializing. Please try again in a few seconds.' });
    }

    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to retrieve projects' });
  }
});

// 2. POST: Submit a new project proposal
app.post('/api/projects', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database initializing. Please try again in a few seconds.' });
    }

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

// 3. POST: Register new club member (Join Us)
app.post('/api/join', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database initializing. Please try again in a few seconds.' });
    }

    const { name, email, phone, interests, reason } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone number are required.' });
    }

    // Prevent duplicate registrations by email
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

// 4. POST: Contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    // Log contact submission (can be stored in a collection or dispatched via email)
    console.log(`📩 New Contact Message from ${name} (${email}): ${message}`);

    res.status(200).json({ message: 'Thank you for reaching out! We will get back to you soon.' });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});