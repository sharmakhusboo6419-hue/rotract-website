const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const achievementsDirectory = path.join(__dirname, 'public', 'uploads', 'achievements');
const achievementsFile = path.join(__dirname, 'data', 'achievements.json');
fs.mkdirSync(achievementsDirectory, { recursive: true });
fs.mkdirSync(path.dirname(achievementsFile), { recursive: true });

const achievementUpload = multer({
  storage: multer.diskStorage({
    destination: achievementsDirectory,
    filename: (req, file, callback) => {
      const extension = path.extname(file.originalname).toLowerCase();
      callback(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`);
    }
  }),
  fileFilter: (req, file, callback) => {
    callback(null, file.mimetype.startsWith('image/'));
  },
  limits: { files: 10, fileSize: 10 * 1024 * 1024 }
});

function readAchievements() {
  try {
    return JSON.parse(fs.readFileSync(achievementsFile, 'utf8'));
  } catch (error) {
    return [];
  }
}

function saveAchievements(achievements) {
  fs.writeFileSync(achievementsFile, JSON.stringify(achievements, null, 2));
}

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.get('/api/photos', (req, res) => {
  const photos = global.photos || [];
  res.json(photos);
});

app.post('/api/photos', (req, res) => {
  const body = req.body || {};
  const { title, caption, imageUrl } = body;
  if (!title || !imageUrl) {
    return res.status(400).json({ error: 'Title and image required' });
  }
  global.photos = global.photos || [];
  const photo = {
    id: global.photos.length + 1,
    title,
    caption: caption || '',
    imageUrl,
    createdAt: new Date()
  };
  global.photos.push(photo);
  res.status(201).json({ message: 'Photo uploaded!', photo });
});

app.get('/api/achievements', (req, res) => {
  res.json(readAchievements());
});

app.post('/api/achievements', achievementUpload.array('achPhotos', 10), (req, res) => {
  const { title, description, category } = req.body || {};
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description required' });
  }
  const achievements = readAchievements();
  const achievement = {
    id: Date.now(),
    title,
    description,
    category: category || 'General',
    achPhotos: (req.files || []).map(file => `/uploads/achievements/${file.filename}`),
    createdAt: new Date()
  };
  achievements.unshift(achievement);
  saveAchievements(achievements);
  res.status(201).json({ message: 'Achievement submitted!', achievement });
});

app.listen(5000, () => console.log('Server running on port 5000'));