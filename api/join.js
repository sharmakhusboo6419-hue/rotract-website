const Member = require('../models/Member.js');
const { connectToDatabase } = require('./_lib/db');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, interests, reason } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone number are required.' });
    }

    const connection = await connectToDatabase();

    if (!connection) {
      return res.status(503).json({ error: 'Database is not configured for this deployment.' });
    }

    const existingMember = await Member.findOne({ email });

    if (existingMember) {
      return res.status(409).json({ error: 'A member with this email address is already registered.' });
    }

    const newMember = await Member.create({
      name,
      email,
      phone,
      interests: interests || 'General',
      reason: reason || ''
    });

    return res.status(201).json({ message: 'Welcome to Rotaract! Registration submitted successfully.', member: newMember });
  } catch (error) {
    console.error('Error registering member:', error);
    return res.status(500).json({ error: 'Failed to complete registration' });
  }
};