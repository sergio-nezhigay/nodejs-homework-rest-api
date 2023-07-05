const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
const { ctrlWrapper } = require("../helpers");
const { HttpError } = require("../helpers");

require("dotenv").config();
const { SECRET_KEY } = process.env;

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

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.validPassword(password)) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logoutUser = async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { token: "" });
  res.status(204).json();
};

const updateSubscriptionUser = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { subscription });
  res.status(204).json();
};

const currentUser = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  logoutUser: ctrlWrapper(logoutUser),
  currentUser: ctrlWrapper(currentUser),
  updateSubscriptionUser: ctrlWrapper(updateSubscriptionUser),
};
