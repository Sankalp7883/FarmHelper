const express = require('express');
const router = express.Router();
const {
  register,
  login,
  googleAuth,
  getProfile,
  registerValidation,
  loginValidation,
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/google', googleAuth);
router.get('/me', protect, getProfile);

module.exports = router;
