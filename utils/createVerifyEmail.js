const createVerifyEmail = (email, verificationToken) => {
  return {
    to: email,
    subject: 'Verify your email',
    html: `<a target="_blank" href="${process.env.BASE_URL}/api/users/verify/${verificationToken}">Click to verify</a>`,
  };
};

module.exports = createVerifyEmail;
