const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.DB_URI;

  if (!uri) {
    throw new Error('DB_URI is not defined in environment variables');
  }

  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    throw error;
  }
}

module.exports = connectDB;

