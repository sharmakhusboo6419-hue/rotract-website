const Project = require('../models/Project.js');
const { connectToDatabase } = require('./_lib/db');

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const connection = await connectToDatabase();

      if (!connection) {
        return res.status(200).json([]);
      }

      const projects = await Project.find().sort({ createdAt: -1 });
      return res.status(200).json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      return res.status(500).json({ error: 'Failed to retrieve projects' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { title, category, description, submittedBy, email } = req.body;

      if (!title || !description || !submittedBy || !email) {
        return res.status(400).json({ error: 'Title, description, submitter name, and email are required.' });
      }

      const connection = await connectToDatabase();

      if (!connection) {
        return res.status(503).json({ error: 'Database is not configured for this deployment.' });
      }

      const newProject = await Project.create({
        title,
        category: category || 'General',
        description,
        submittedBy,
        email
      });

      return res.status(201).json({ message: 'Project proposal submitted successfully!', project: newProject });
    } catch (error) {
      console.error('Error submitting project:', error);
      return res.status(500).json({ error: 'Failed to submit project proposal' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: 'Method not allowed' });
};