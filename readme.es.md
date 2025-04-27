const express = require('express');
const router = express.Router();
const contacts = require('../../models/contacts');

// przykład trasy GET /api/contacts
router.get('/', async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    res.json(allContacts);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
