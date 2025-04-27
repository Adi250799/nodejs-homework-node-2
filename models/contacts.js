const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Ścieżka do pliku JSON z kontaktami
const contactsPath = path.join(__dirname, './contacts.json');

// Funkcja pomocnicza do czytania pliku
async function readContacts() {
  const data = await fs.readFile(contactsPath, 'utf8');
  return JSON.parse(data);
}

// Funkcja pomocnicza do zapisywania pliku
async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

// Lista wszystkich kontaktów
const listContacts = async () => {
  return await readContacts();
};

// Pobranie kontaktu po ID
const getContactById = async (contactId) => {
  const contacts = await readContacts();
  const contact = contacts.find(c => c.id === contactId);
  return contact || null;
};

// Usuwanie kontaktu
const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const index = contacts.findIndex(c => c.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(index, 1);
  await writeContacts(contacts);
  return removedContact;
};

// Dodawanie nowego kontaktu
const addContact = async (body) => {
  const contacts = await readContacts();
  const newContact = { id: uuidv4(), ...body };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
};

// Aktualizacja istniejącego kontaktu
const updateContact = async (contactId, body) => {
  const contacts = await readContacts();
  const index = contacts.findIndex(c => c.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...body };
  await writeContacts(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
