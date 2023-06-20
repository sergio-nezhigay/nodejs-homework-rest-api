const fs = require("fs/promises");
const path = require("path");

const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId) || null;
  return result;
};

const removeContact = async (contactId) => {};

const addContact = async (data) => {
  const oldContacts = await listContacts();
  const newContact = { id: nanoid(), ...data };
  console.log("🚀 ~ file: index.js:25 ~ addContact ~ newContact:", newContact);
  const newContacts = [...oldContacts, newContact];

  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
