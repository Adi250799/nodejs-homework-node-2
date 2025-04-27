const express = require('express');
const router = express.Router();
const Joi = require('joi'); // Importujemy Joi

// Schematy walidacji przy użyciu Joi
const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
}).min(1); // Minimum jedno pole musi być podane do aktualizacji

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../models/contacts');

// @GET /api/contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts' });
  }
});

// @GET /api/contacts/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await getContactById(id);
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact' });
  }
});

// @POST /api/contacts
router.post('/', async (req, res) => {
  const { name, email, phone } = req.body;

  // Walidacja danych przy użyciu Joi
  const { error } = addContactSchema.validate({ name, email, phone }); // Używamy Joi do walidacji
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: 'Error adding contact' });
  }
});

// @DELETE /api/contacts/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const removedContact = await removeContact(id);
    if (!removedContact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact' });
  }
});

// @PUT /api/contacts/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  // Walidacja danych przy użyciu Joi
  const { error } = updateContactSchema.validate({ name, email, phone }); // Używamy Joi do walidacji
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const updatedContact = await updateContact(id, req.body);
    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact' });
  }
});

module.exports = router;
