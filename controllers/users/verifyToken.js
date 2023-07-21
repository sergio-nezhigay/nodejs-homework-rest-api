const { HttpError } = require("../../helpers");
const { User } = require("../../models");

const verifyToken = async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  user.verificationToken = null;
  user.verify = true;
  await user.save();
  res.status(200);
  res.json({
    message: "Verification successful",
  });
};

module.exports = verifyToken;
