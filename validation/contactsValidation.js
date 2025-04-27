const Joi = require('joi');

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
}).min(1); // musi być przynajmniej jedno pole

module.exports = {
  addContactSchema,
  updateContactSchema,
};
