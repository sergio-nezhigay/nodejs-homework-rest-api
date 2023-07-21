const { nanoid } = require("nanoid");

const { HttpError } = require("../../helpers");
const sendConfirmMail = require("../../services/email/sendMail");
const { User } = require("../../models");

const reSendVerifyEmail = async (req, res, next) => {
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

module.exports = reSendVerifyEmail;
