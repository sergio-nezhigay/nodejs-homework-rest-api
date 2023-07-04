const express = require("express");

const ctrl = require("../../controllers/users");
const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.get("/", ctrl.listUsers);

router.post("/register", validateBody(schemas.authSchema), ctrl.registerUser);

router.post("/login", validateBody(schemas.authSchema), ctrl.loginUser);

module.exports = router;
