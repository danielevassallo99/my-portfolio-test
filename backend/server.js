const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Project = require('./models/Project');
const sampleProjects = require('./utils/sampleProjects');

const localEnv = dotenv.config();
if (localEnv.error) {
  const rootEnvPath = path.resolve(__dirname, '../.env');
  const rootEnv = dotenv.config({ path: rootEnvPath });
  if (rootEnv.error) {
    console.warn('⚠️  No .env file found; relying on existing process variables.');
  }
}

const PORT = process.env.PORT || 5000;
const corsOrigins =
  process.env.CORS_ORIGINS || 'http://localhost:3000,http://localhost:5000,http://127.0.0.1:3000';
const allowedOrigins = corsOrigins.split(',').map((origin) => origin.trim());

async function ensureSampleProjects() {
  try {
    const count = await Project.countDocuments();
    if (count === 0) {
      await Project.insertMany(sampleProjects);
      console.log('🌱 Sample projects caricati automaticamente');
    }
  } catch (error) {
    console.warn('Impossibile inserire i progetti di esempio:', error.message);
  }
}

async function bootstrap() {
  try {
    await connectDB();
    await ensureSampleProjects();
    const app = express();

    app.use(
      cors({
        origin(origin, callback) {
          if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error(`CORS non permesso per origine: ${origin}`));
          }
        }
      })
    );
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



