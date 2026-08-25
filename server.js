const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/achievements', (req, res) => {
  // In-memory store (shared across requests)
  const achievements = global.achievements || [];
  res.json(achievements);
});

app.post('/api/achievements', (req, res) => {
  const body = req.body || {};
  const { title, description, category,achPhotos } = body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description required' });
  }
  // Add to global achievements store
  global.achievements = global.achievements || [];
  const achievement = {
    id: global.achievements.length + 1,
    title,
    description,
    category: category || 'General',
    achPhotos,
    createdAt: new Date()
  };
  global.achievements.push(achievement);
  res.status(201).json({ message: 'Achievement submitted!', achievement });
});

app.listen(5000, () => console.log('Server running on port 5000'));