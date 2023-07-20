const { ctrlWrapper } = require("../../helpers");

const registerUser = require("./registerUser");
const loginUser = require("./loginUser");
const logoutUser = require("./logoutUser");
const currentUser = require("./currentUser");
const updateSubscriptionUser = require("./updateSubscriptionUser");
const updateAvatarUser = require("./updateAvatarUser");
const verifyToken = require("./verifyToken");
const reSendVerifyEmail = require("./reSendVerifyEmail");

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  logoutUser: ctrlWrapper(logoutUser),
  currentUser: ctrlWrapper(currentUser),
  updateSubscriptionUser: ctrlWrapper(updateSubscriptionUser),
  updateAvatarUser: ctrlWrapper(updateAvatarUser),
  verifyToken: ctrlWrapper(verifyToken),
  reSendVerifyEmail: ctrlWrapper(reSendVerifyEmail),
};
