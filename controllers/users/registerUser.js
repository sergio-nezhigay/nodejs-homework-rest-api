const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const newUser = new User({ email });
  newUser.setPassword(password);
  const savedUser = await newUser.save();

  res.status(201).json({
    user: {
      email: savedUser.email,
      subscription: savedUser.subscription,
    },
  });
};

module.exports = registerUser;
