const { BadRequest } = require('http-errors');

const validation = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(BadRequest(error.message));
    }
    next();
  };
};

module.exports = validation;
