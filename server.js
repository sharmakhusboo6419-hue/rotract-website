const express = require('express');
const path = require('path');
const fs = require('fs');
const os = require('os');
const multer = require('multer');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const localStorageRoot = __dirname;
const temporaryStorageRoot = path.join(os.tmpdir(), 'rotract-website');

function getStorageRoot() {
  try {
    fs.mkdirSync(localStorageRoot, { recursive: true });
    fs.accessSync(localStorageRoot, fs.constants.W_OK);
    return localStorageRoot;
  } catch (error) {
    fs.mkdirSync(temporaryStorageRoot, { recursive: true });
    return temporaryStorageRoot;
  }
}

const storageRoot = getStorageRoot();
const achievementsDirectory = path.join(storageRoot, 'public', 'uploads', 'achievements');
const achievementsFile = path.join(storageRoot, 'data', 'achievements.json');
const galleryDirectory = path.join(storageRoot, 'public', 'uploads', 'gallery');
const galleryFile = path.join(storageRoot, 'data', 'gallery.json');
fs.mkdirSync(path.dirname(achievementsFile), { recursive: true });
fs.mkdirSync(achievementsDirectory, { recursive: true });
fs.mkdirSync(galleryDirectory, { recursive: true });

const galleryUpload = multer({
  storage: multer.diskStorage({
    destination: galleryDirectory,
    filename: (req, file, callback) => {
      const extension = path.extname(file.originalname).toLowerCase();
      callback(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`);
    }
  }),
  fileFilter: (req, file, callback) => callback(null, file.mimetype.startsWith('image/')),
  limits: { files: 20, fileSize: 15 * 1024 * 1024 }
});

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
  try {
    fs.writeFileSync(achievementsFile, JSON.stringify(achievements, null, 2));
    return true;
  } catch (error) {
    return false;
  }
}

function readGalleryPhotos() {
  try {
    return JSON.parse(fs.readFileSync(galleryFile, 'utf8'));
  } catch (error) {
    return [];
  }
}

function saveGalleryPhotos(photos) {
  try {
    fs.writeFileSync(galleryFile, JSON.stringify(photos, null, 2));
    return true;
  } catch (error) {
    return false;
  }
}

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.get('/api/photos', (req, res) => {
  res.json(readGalleryPhotos());
});

app.post('/api/photos', galleryUpload.array('photoImage', 20), (req, res) => {
  const body = req.body || {};
  const { title, caption, imageUrl } = body;
  const uploadedFiles = req.files || [];
  if (!title || (!imageUrl && uploadedFiles.length === 0)) {
    return res.status(400).json({ error: 'Title and image required' });
  }
  const photos = readGalleryPhotos();
  const newPhotos = uploadedFiles.length > 0
    ? uploadedFiles.map(file => ({
        id: Date.now() + Math.random(),
        title,
        caption: caption || '',
        imageUrl: `/uploads/gallery/${file.filename}`,
        createdAt: new Date()
      }))
    : [{ id: Date.now(), title, caption: caption || '', imageUrl, createdAt: new Date() }];
  photos.unshift(...newPhotos);
  if (!saveGalleryPhotos(photos)) {
    return res.status(503).json({ error: 'Gallery storage is currently unavailable' });
  }
  res.status(201).json({ message: 'Photo uploaded!', photos: newPhotos });
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
  if (!saveAchievements(achievements)) {
    return res.status(503).json({ error: 'Achievement storage is currently unavailable' });
  }
  res.status(201).json({ message: 'Achievement submitted!', achievement });
});

if (require.main === module) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

module.exports = app;