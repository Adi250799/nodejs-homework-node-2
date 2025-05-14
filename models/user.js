// routes/api/users.js
const express = require('express');
const router = express.Router();

// Dodaj tutaj wszystkie odpowiednie trasy dla użytkowników
router.get('/', (req, res) => {
  res.send('List of users');
});

module.exports = router;
