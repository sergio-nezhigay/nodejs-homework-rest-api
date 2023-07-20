const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { HttpError, sendConfirmMail } = require("../../helpers");
const { User } = require("../../models/user");

const registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const newUser = new User({ email, avatarURL, verificationToken });

  await sendConfirmMail({ email, verificationToken });

  newUser.setPassword(password);
  const savedUser = await newUser.save();

  res.status(201).json({
    user: {
      email: savedUser.email,
      avatarURL: savedUser.avatarURL,
      subscription: savedUser.subscription,
    },
  });
};

module.exports = registerUser;
