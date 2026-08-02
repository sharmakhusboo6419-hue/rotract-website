const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB Atlas...');
}

async function disconnectDB() {
  await mongoose.disconnect();
  console.log('👋 Disconnected from MongoDB');
}

module.exports = { connectDB, disconnectDB };
