const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { protect } = require('../middlewares/authMiddleware');
const { body } = require('express-validator');
const validate = require('../middlewares/validateMiddleware');

// Create Project
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Project name is required')
  ],
  validate,
  protect,
  projectController.createProject
);

// Get All Projects for User
router.get(
  '/',
  protect,
  projectController.getProjects
);

router.delete(
  '/:projectId',
  protect,
  projectController.deleteProject
);

module.exports = router;