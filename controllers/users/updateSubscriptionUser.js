const { User } = require("../../models");

const updateSubscriptionUser = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  res.json({
    subscription: updatedUser.subscription,
    email: updatedUser.email,
  });
};

module.exports = updateSubscriptionUser;
