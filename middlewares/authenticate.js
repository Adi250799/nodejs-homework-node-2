const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { Unauthorized } = require('http-errors');
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new Unauthorized('Not authorized');
    }

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token) {
      throw new Unauthorized('Not authorized');
    }

    req.user = user;
    next();
  } catch {
    next(new Unauthorized('Not authorized'));
  }
};

module.exports = authenticate;
