const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
const { ctrlWrapper } = require("../helpers");
const { HttpError } = require("../helpers");

require("dotenv").config();
const secret = process.env.SECRET;

const listUsers = async (req, res) => {
  const result = await User.find({}, "-createdAt -updatedAt");
  res.json(result);
};

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

  const token = jwt.sign(payload, secret, { expiresIn: "24h" });
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = {
  listUsers: ctrlWrapper(listUsers),
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
};
