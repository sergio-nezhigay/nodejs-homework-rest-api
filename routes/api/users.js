const express = require("express");

const ctrl = require("../../controllers/users");
const { validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.authSchema), ctrl.registerUser);

router.post("/login", validateBody(schemas.authSchema), ctrl.loginUser);
router.post("/logout", authenticate, ctrl.logoutUser);
router.get("/current", authenticate, ctrl.currentUser);

module.exports = router;
