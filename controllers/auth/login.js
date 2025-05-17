const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });

  user.token = token;
  await user.save();

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
