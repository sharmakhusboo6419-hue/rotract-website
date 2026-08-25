const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => res.send('Server is running'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.get('/api/achievements', (req, res) => {
  res.json(achievements);
});

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

app.listen(5000, () => console.log('Server running on port 5000'));