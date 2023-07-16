const Jimp = require("jimp");
const path = require("path");
const fs = require("fs").promises;

const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const publicDir = path.join(process.cwd(), "public");
const storeAvatars = path.join(publicDir, "avatars");

const updateAvatarUser = async (req, res, next) => {
  if (!req.file) {
    throw HttpError(400, "No file uploaded");
  }
  const { path: temporaryName, originalname } = req.file;
  const { _id } = req.user;
  const filename = `${_id}_${originalname}`;
  const targetFileName = path.join(storeAvatars, filename);
  await fs.rename(temporaryName, targetFileName);

  const image = await Jimp.read(targetFileName);
  image.resize(250, 250).write(targetFileName);

  const avatarURL = path.join("avatars", filename);
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { avatarURL },
    { new: true }
  );

  res.json({
    avatarURL: updatedUser.avatarURL,
  });
};

module.exports = updateAvatarUser;
