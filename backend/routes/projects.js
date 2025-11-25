const express = require('express');
const router = express.Router();
const { getProjects, getProjectById, createProject } = require('../controllers/projectController');

router.get('/', getProjects);
router.post('/', createProject);
router.get('/:id', getProjectById);

module.exports = router;

