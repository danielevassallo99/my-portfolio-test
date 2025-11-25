const Project = require('../models/Project');
const mongoose = require('mongoose');

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid project ID format' });
    }

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
};

const createProject = async (req, res) => {
  try {
    const { titolo, categoria, descrizione, immagini, featured } = req.body;

    // Validazione campi obbligatori
    if (!titolo || !categoria || !descrizione) {
      return res.status(400).json({
        success: false,
        error: 'I campi titolo, categoria e descrizione sono obbligatori'
      });
    }

    // Validazione immagini (deve essere un array)
    if (!Array.isArray(immagini)) {
      return res.status(400).json({
        success: false,
        error: 'Il campo immagini deve essere un array'
      });
    }

    // Validazione che immagini non sia vuoto
    if (immagini.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Almeno un\'immagine è richiesta'
      });
    }

    // Validazione categoria (deve essere uno dei valori permessi)
    const allowedCategories = ['UX', 'UI', 'Branding', 'Web Design', 'App'];
    if (!allowedCategories.includes(categoria)) {
      return res.status(400).json({
        success: false,
        error: `La categoria deve essere uno di: ${allowedCategories.join(', ')}`
      });
    }

    // Creazione nuovo progetto (mappatura campi italiani -> inglesi)
    const newProject = new Project({
      title: titolo.trim(),
      category: categoria.trim(),
      description: descrizione.trim(),
      images: immagini,
      featured: featured !== undefined ? featured : false
    });

    await newProject.save();

    res.status(201).json({
      success: true,
      project: newProject
    });
  } catch (error) {
    console.error('Error creating project:', error);

    // Gestione errori di validazione Mongoose
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: Object.values(error.errors).map(e => e.message).join(', ')
      });
    }

    res.status(500).json({
      success: false,
      error: 'Errore nella creazione del progetto'
    });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject
};

