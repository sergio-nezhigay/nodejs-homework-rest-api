const { nanoid } = require("nanoid");

const { HttpError, sendConfirmMail } = require("../../helpers");
const { User } = require("../../models/user");

const verifyUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verificationToken = nanoid();
  await sendConfirmMail({ email, verificationToken });
  user.verificationToken = verificationToken;
  await user.save();

  res.status(200);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = verifyUser;
