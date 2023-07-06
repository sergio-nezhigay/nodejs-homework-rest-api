const { Contact } = require("../../models/contact");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;

  const skip = (page - 1) * limit;

  const query = { owner };
  if (favorite) {
    query.favorite = favorite;
  }

  const result = await Contact.find(query, "-createdAt -updatedAt", {
    skip,
    limit,
  });
  res.json(result);
};

module.exports = listContacts;
