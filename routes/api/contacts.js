const express = require('express');
const router = express.Router();
const contactsController = require('../../controllers/contacts');  // Zaimportuj kontroler

// GET wszystkie kontakty
router.get('/', async (req, res) => {
  try {
    const contacts = await contactsController.listContacts(); // Pobranie listy kontaktów
    res.status(200).json(contacts); // Zwrócenie listy kontaktów
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET kontakt po ID
router.get('/:contactId', async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await contactsController.getContactById(contactId); // Pobranie kontaktu po ID
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST dodanie nowego kontaktu
router.post('/', async (req, res) => {
  const newContact = req.body;
  try {
    const addedContact = await contactsController.addContact(newContact); // Dodanie nowego kontaktu
    res.status(201).json(addedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE usunięcie kontaktu
router.delete('/:contactId', async (req, res) => {
  const { contactId } = req.params;
  try {
    const removedContact = await contactsController.removeContact(contactId); // Usunięcie kontaktu
    if (!removedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT aktualizacja kontaktu
router.put('/:contactId', async (req, res) => {
  const { contactId } = req.params;
  const updatedContactData = req.body;
  try {
    const updatedContact = await contactsController.updateContact(contactId, updatedContactData); // Aktualizacja kontaktu
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH aktualizacja statusu ulubionego kontaktu
router.patch('/:contactId/favorite', async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).json({ message: 'missing field favorite' });
  }

  try {
    const updatedContact = await contactsController.updateStatusContact(contactId, { favorite });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
