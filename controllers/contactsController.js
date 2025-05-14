const Contact = require("../models/contact");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const filter = { owner };
  if (favorite !== undefined) {
    filter.favorite = favorite === "true"; // zamiana stringa na boolean
  }

  const contacts = await Contact.find(filter, "-__v", {
    skip,
    limit: Number(limit),
  }).populate("owner", "email");

  res.json(contacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const contact = await Contact.findOne({ _id: contactId, owner });
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(contact);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const contact = await Contact.create({ ...req.body, owner });

  res.status(201).json(contact);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const contact = await Contact.findOneAndDelete({ _id: contactId, owner });
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json({ message: "Contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body,
    { new: true }
  );

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(contact);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    { favorite: req.body.favorite },
    { new: true }
  );

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(contact);
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
