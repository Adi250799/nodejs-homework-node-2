const { v4: uuidv4 } = require('uuid');
const User = require('../../models/user');
const sendEmail = require('../../services/email');
const createVerifyEmail = require('../../utils/createVerifyEmail');

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(409).json({ message: 'Email in use' });
  }

  const verificationToken = uuidv4();
  const newUser = new User({ email, verificationToken });
  newUser.setPassword(password);
  await newUser.save();

  const emailData = createVerifyEmail(email, verificationToken);
  await sendEmail(emailData);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: 'starter',
    },
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.verify = true;
  user.verificationToken = null;
  await user.save();

  res.status(200).json({ message: 'Verification successful' });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'missing required field email' });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (user.verify) {
    return res.status(400).json({ message: 'Verification has already been passed' });
  }

  const emailData = createVerifyEmail(email, user.verificationToken);
  await sendEmail(emailData);

  res.status(200).json({ message: 'Verification email sent' });
};

module.exports = {
  register,
  verifyEmail,
  resendVerifyEmail,
};
