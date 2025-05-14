const express = require('express');
const { signup, login, logout, getCurrent } = require('../controllers/authController');
const validateBody = require('../middlewares/validateBody');
const authMiddleware = require('../middlewares/authMiddleware');
const { registerSchema, loginSchema } = require('../schemas/users');

const router = express.Router();

router.post('/signup', validateBody(registerSchema), signup);
router.post('/login', validateBody(loginSchema), login);
router.get('/logout', authMiddleware, logout);
router.get('/current', authMiddleware, getCurrent);

module.exports = router;
