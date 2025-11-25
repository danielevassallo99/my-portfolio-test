const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const localEnv = dotenv.config();
if (localEnv.error) {
  const rootEnvPath = path.resolve(__dirname, '../.env');
  const rootEnv = dotenv.config({ path: rootEnvPath });
  if (rootEnv.error) {
    console.warn('⚠️  No .env file found; relying on existing process variables.');
  }
}

const PORT = process.env.PORT || 5000;
const API_URL = process.env.API_URL || 'http://localhost:5000';

async function bootstrap() {
  try {
    await connectDB();
    const app = express();

    app.use(cors({ origin: API_URL === '*' ? '*' : API_URL }));
    app.use(express.json());

    // Importa le rotte
    const projectRoutes = require('./routes/projects');

    // Collega le rotte al server
    app.use('/api/projects', projectRoutes);

    const messageRoutes = require('./routes/messages');
    app.use('/api/messages', messageRoutes);

    const newsletterRoutes = require('./routes/newsletter');
    app.use('/api/newsletter', newsletterRoutes);

    app.get('/api/health', (_req, res) => {
      res.json({ status: 'ok' });
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server initialization failed:', error.message);
    process.exit(1);
  }
}

bootstrap();



