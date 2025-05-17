const Jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");
const User = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../public/avatars");

const updateAvatar = async (req, res) => {
  const { path: tmpPath, originalname } = req.file;
  const { _id } = req.user;

  const newFilename = `${_id}-${originalname}`;
  const finalPath = path.join(avatarsDir, newFilename);

  await Jimp.read(tmpPath)
    .then((img) => img.resize(250, 250).writeAsync(tmpPath));

  await fs.rename(tmpPath, finalPath);

  const avatarURL = `/avatars/${newFilename}`;
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({ avatarURL });
};

module.exports = updateAvatar;
