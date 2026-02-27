const { body } = require('express-validator');
const validate = require('../middlewares/validateMiddleware');
const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required')
  ],
  validate,
  authController.login
);

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
  ],
  validate,
  authController.register
);

module.exports = router;
