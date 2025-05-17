const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const User = require("../../models/user");

const register = async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { s: "250", d: "retro" }, true);

  const user = new User({
    email,
    password: hashedPassword,
    avatarURL,
  });

  await user.save();

  res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  });
};

module.exports = register;
