const express = require('express');
const authMiddleware = require('../../middlewares/authMiddleware');
const { listContacts } = require('../../controllers/contactsController');

const router = express.Router();

router.use(authMiddleware);

router.get('/', listContacts);
// inne trasy CRUD

module.exports = router;
