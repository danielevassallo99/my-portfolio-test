const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Project = require('./models/Project');

const localEnv = dotenv.config();
if (localEnv.error) {
  const rootEnvPath = path.resolve(__dirname, '../.env');
  dotenv.config({ path: rootEnvPath });
}

const projects = [
  {
    title: 'Together Experience Platform',
    category: 'Web Design',
    description:
      'Piattaforma digitale progettata per trasformare il booking delle esperienze turistiche alle Isole Canarie. Ho condotto ricerca con operatori locali, mappato la customer journey e definito un design system modulare che supporta centinaia di tour personalizzati. Il redesign ha introdotto filtri intelligenti, onboarding guidato e una dashboard per gli host. Documentazione completa per il team React e guidelines WCAG AA hanno garantito un rilascio veloce e accessibile.',
    images: [
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80'
    ],
    featured: true
  },
  {
    title: 'Previo – Preventive Healthcare App',
    category: 'App',
    description:
      'Applicazione mobile che guida le persone nella prevenzione sanitaria personalizzata. Ho supervisionato user research qualitativa, progettato i flussi di reminder dinamici e creato un design system mobile-first con microinterazioni mirate a ridurre l’ansia dell’utente. Dashboard e storytelling visivo aiutano a monitorare abitudini e risultati. Iterazioni rapide con usability test hanno portato al 97% di feedback positivi nei test interni.',
    images: [
      'https://images.unsplash.com/photo-1481988535861-271139e06469?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&w=1600&q=80'
    ],
    featured: true
  },
  {
    title: 'Cosmico Talent Platform',
    category: 'UX',
    description:
      'Redesign dei flussi di registrazione e discovery per la community Cosmico. Ho effettuato un audit completo dell’informazione, ridotto del 40% i passaggi necessari per creare il profilo e introdotto un linguaggio visivo coerente con la nuova brand identity. Il progetto ha incluso co-design workshop con il team interno, wireframe iterativi, prototipi ad alta fedeltà in Figma e handoff strutturato con librerie di componenti riutilizzabili.',
    images: [
      'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1517142089942-ba376ce32a0a?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80'
    ],
    featured: true
  },
  {
    title: 'Comune di Milano – Air Quality Portal',
    category: 'Branding',
    description:
      'Sito informativo per sensibilizzare i cittadini sulla qualità dell’aria con dati in tempo reale e consigli di comportamento. Ho progettato un’architettura dei contenuti accessibile, definito la content strategy e creato visual data storytelling coerente con l’identità istituzionale. L’interfaccia è stata validata con test di accessibilità WCAG AA e adattata a device mobile per garantire consultazioni rapide sul campo.',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80'
    ],
    featured: false
  },
  {
    title: 'Crispy Bacon – Banca del Futuro',
    category: 'UI',
    description:
      'Concept per un’esperienza bancaria AI-driven sviluppato durante la challenge Crispy Bacon. Ho ideato la customer journey end-to-end, realizzato prototipi dinamici in Figma e definito pattern conversational per l’assistente virtuale. Il focus è stato dare fiducia e trasparenza alle azioni finanziarie complesse, con un’interfaccia modulare pronta all’integrazione con API reali.',
    images: [
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80'
    ],
    featured: false
  }
];

async function seed() {
  try {
    await connectDB();
    await Project.deleteMany({});
    const result = await Project.insertMany(projects);
    console.log(`✅ Inseriti ${result.length} progetti nel database.`);
  } catch (error) {
    console.error('❌ Seed fallito:', error);
  } finally {
    mongoose.connection.close();
  }
}

seed();

