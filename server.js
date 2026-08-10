const path = require('path');

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Project = require('./models/Project.js');
const Member = require('./models/Member.js');
const { teamMembers, membersList } = require('./seed-data/members-data');
const { facultyList } = require('./seed-data/faculty-data');

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
  'IMG-20260731-WA0007.jpg.jpeg': '/images/dolly-gupta.jpeg',
  'IMG-20260803-WA0032.jpg.jpeg': '/images/sathwik.jpeg',
  'IMG_20260302_153939.jpg.jpeg': '/images/ramya.jpeg',
  'IMG_20251122_154759830.jpg.jpeg': '/images/sandhya-kumari.jpeg',
  'IMG_8305.JPG.jpeg': '/images/dhanush.jpeg',
  'IMG_8304.JPG.jpeg': '/images/avnish-kumar-2026.jpeg',
  'IMG_8303.JPG.jpeg': '/images/hamid-ashraf.jpeg',
  'IMG_8302.JPG.jpeg': '/images/monisha-kumari.jpeg',
  'IMG_8301.JPG.jpeg': '/images/khusboo-sharma.jpeg',
  '88D3B1EC-D293-4976-A5F1-DBCF1D074DE1.jpeg': '/images/kishan-pandey.jpeg',
  'file_0000000066a082118da2d06ae1ec659a.png': '/images/adithyian-vinod.png',
  'IMG_3037.JPG (1).jpeg': '/images/skanda.jpeg',
  'IMG_8300.JPG.jpeg': '/images/sandhya-alt.jpeg'
};

function escapeXml(value) {
  return String(value).replace(/[&<>"]|'/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;'
  }[character]));
}

function buildAvatarDataUri(name) {
  const initials = String(name || 'Member')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase() || 'M';

  const palette = ['1d4ed8', '0f766e', 'b45309', '7c3aed', 'be123c', '0f172a', '2563eb'];
  const hash = [...String(name || 'Member')].reduce((value, character) => value + character.charCodeAt(0), 0);
  const background = palette[hash % palette.length];
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" role="img" aria-label="${escapeXml(name || 'Member')}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#${background}" />
          <stop offset="100%" stop-color="#1e40af" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" rx="48" fill="url(#g)" />
      <circle cx="200" cy="170" r="74" fill="rgba(255,255,255,0.16)" />
      <text x="50%" y="56%" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="112" font-weight="700">${escapeXml(initials)}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg.replace(/\s{2,}/g, ' ').trim())}`;
}

function normalizePhotoUrl(photoUrl, name = 'Member') {
  if (!photoUrl || typeof photoUrl !== 'string') {
    return buildAvatarDataUri(name);
  }

  if (photoUrl.startsWith('/images/') || photoUrl.startsWith('http://') || photoUrl.startsWith('https://') || photoUrl.startsWith('data:image/')) {
    return photoUrl;
  }

  const fileName = path.basename(photoUrl);
  return LEGACY_PHOTO_MAP[fileName] || buildAvatarDataUri(name);
}

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Serverless-friendly Database Connection Helper
const MONGO_URI = process.env.MONGO_URI;

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (!MONGO_URI) {
    throw new Error('MONGO_URI is not set in environment variables.');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    }).then((mongooseInstance) => {
      console.log('✅ Connected to MongoDB Atlas!');
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

// ==================== API ROUTES ====================

app.get('/api/members', async (req, res) => {
  try {
    await connectDB();

    const members = await TeamMember.find().sort({ createdAt: -1 });
    const normalizedMembers = members.map((member) => ({
      ...member.toObject(),
      photoUrl: normalizePhotoUrl(member.photoUrl, member.name)
    }));

    if (!normalizedMembers.length) {
      return res.json([...teamMembers, ...membersList].map((member) => ({
        ...member,
        photoUrl: normalizePhotoUrl(member.photoUrl, member.name)
      })));
    }

    res.json(normalizedMembers);
  } catch (error) {
    console.error('Error fetching members:', error);
    // Fallback to static seed list if DB connection fails
    res.json([...teamMembers, ...membersList].map((member) => ({
      ...member,
      photoUrl: normalizePhotoUrl(member.photoUrl, member.name)
    })));
  }
});

app.post('/api/members', async (req, res) => {
  try {
    await connectDB();
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

app.get('/api/faculty', (req, res) => {
  try {
    res.json(facultyList);
  } catch (error) {
    console.error('Error fetching faculty:', error);
    res.status(500).json({ error: 'Failed to retrieve faculty' });
  }
});

app.get('/api/health', async (req, res) => {
  try {
    await connectDB();
    res.json({ status: 'ok', database: 'connected' });
  } catch (err) {
    res.json({ status: 'ok', database: 'disconnected' });
  }
});

// 1. GET: Fetch all active projects
app.get('/api/projects', async (req, res) => {
  try {
    await connectDB();

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

// 3. POST: Register new club member (Join Us)
app.post('/api/join', async (req, res) => {
  try {
    await connectDB();

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

    console.log(`📩 New Contact Message from ${name} (${email}): ${message}`);

    res.status(200).json({ message: 'Thank you for reaching out! We will get back to you soon.' });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Start Server locally or export for Vercel Serverless
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Local Server running on port ${PORT}`);
  });
}

module.exports = app;