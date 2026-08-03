const TeamMember = require('../models/TeamMember.js');
const { connectToDatabase } = require('./_lib/db');
const { teamMembers, membersList } = require('../rotaract-backend/seed-data/members-data');

function fallbackMembers() {
  return [...teamMembers, ...membersList];
}

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const connection = await connectToDatabase();

      if (!connection) {
        return res.status(200).json(fallbackMembers());
      }

      const members = await TeamMember.find().sort({ createdAt: -1 });

      if (!members.length) {
        return res.status(200).json(fallbackMembers());
      }

      return res.status(200).json(members);
    } catch (error) {
      console.error('Error fetching members:', error);
      return res.status(200).json(fallbackMembers());
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, role, email, photoUrl, bio, year, category } = req.body;

      if (!name || !role || !photoUrl) {
        return res.status(400).json({ error: 'Name, role, and photo URL are required.' });
      }

      const connection = await connectToDatabase();

      if (!connection) {
        return res.status(503).json({ error: 'Database is not configured for this deployment.' });
      }

      const newMember = await TeamMember.create({
        name,
        role,
        email,
        photoUrl,
        bio,
        year,
        category: category || 'member'
      });

      return res.status(201).json({ message: 'Member saved successfully!', member: newMember });
    } catch (error) {
      console.error('Error saving member:', error);
      return res.status(500).json({ error: 'Failed to save member' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: 'Method not allowed' });
};