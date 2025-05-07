const express = require('express');
const router = express.Router();
const contactsController = require('../../controllers/contacts');

// PATCH aktualizacja statusu ulubionego kontaktu
router.patch('/:contactId/favorite', async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  // Sprawdzamy, czy w body przekazano pole 'favorite'
  if (favorite === undefined) {
    return res.status(400).json({ message: 'missing field favorite' });
  }

  try {
    // Wywołanie metody kontrolera do aktualizacji statusu
    const updatedContact = await contactsController.updateStatusContact(contactId, { favorite });
    
    // Jeśli kontakt nie istnieje, zwróć 404
    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }

    // Jeśli wszystko jest ok, zwróć zaktualizowany kontakt
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
