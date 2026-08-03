module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    console.log('📩 New Contact Submission:', { name, email, subject, message });

    return res.status(200).json({ message: 'Message received successfully!' });
  } catch (error) {
    console.error('Error handling contact form:', error);
    return res.status(500).json({ error: 'Failed to process message' });
  }
};