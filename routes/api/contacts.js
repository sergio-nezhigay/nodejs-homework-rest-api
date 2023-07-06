const express = require("express");

const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.listContacts);
router.get("/:id", authenticate, isValidId, ctrl.getById);
router.delete("/:id", authenticate, isValidId, ctrl.removeContact);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.updateSchema),
  ctrl.updateContact
);

router.patch(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.updateStatusSchema),
  ctrl.updateContact
);

module.exports = router;
