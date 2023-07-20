const express = require("express");

const ctrl = require("../../controllers/users");
const { validateBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.patch(
  "/",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateSubscriptionUser
);
router.post("/register", validateBody(schemas.authSchema), ctrl.registerUser);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatarUser
);

router.post("/login", validateBody(schemas.authSchema), ctrl.loginUser);
router.post("/logout", authenticate, ctrl.logoutUser);
router.get("/current", authenticate, ctrl.currentUser);
router.get(
  "/verify",
  validateBody(schemas.verifyEmailSchema),
  ctrl.reSendVerifyEmail
);
router.get("/verify/:verificationToken", ctrl.verifyToken);

module.exports = router;
