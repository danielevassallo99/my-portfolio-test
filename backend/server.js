const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 4000;
const DB_URI = process.env.DB_URI || '';
const API_URL = process.env.API_URL || '*';

const app = express();

app.use(cors({ origin: API_URL === '*' ? '*' : API_URL }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

async function startServer() {
  try {
    if (DB_URI) {
      await mongoose.connect(DB_URI);
      console.log('Connected to MongoDB');
    } else {
      console.warn('DB_URI missing; skipping MongoDB connection');
    }
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
  });
}

startServer();


