const express = require('express');
const router = express.Router();
const { register, verifyEmail, resendVerifyEmail } = require('../../controllers/auth/auth');

router.post('/register', register);
router.get('/verify/:verificationToken', verifyEmail);
router.post('/verify', resendVerifyEmail);

module.exports = router;
