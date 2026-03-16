const express = require("express");
const router = express.Router();
const sendActivationEmail =
  require("../services/mail.service").sendActivationEmail;
const { authenticate, authorizeAdmin } = require("../services/token_validator");

const UserController = require("../controllers/user_controller");

router.post(
  "/create/admin",
  // authenticate,
  // authorizeAdmin,
  UserController.create_user_admin,
);
router.post("/resend-activation-email", UserController.resendActivationEmail);
router.get("/token/creation/check/:token", UserController.tokenValideChecker);
router.post("/activate/account", UserController.activateAccount);
router.get("/get/all", authenticate, UserController.getAllUsers);
router.get(
  "/account/lock/:id",
  authenticate,
  authorizeAdmin,
  UserController.lockAccount,
);
router.get(
  "/account/unlock/:id",
  authenticate,
  authorizeAdmin,
  UserController.unlockAccount,
);
router.delete(
  "/account/delete/:id",
  authenticate,
  authorizeAdmin,
  UserController.deleteAccount,
);
router.get("/:id", authenticate, UserController.userById);
router.get("/profile-image/:filename", UserController.getProfileImage);
router.put("/edit-profile/:id", authenticate, UserController.editProfile);
router.put(
  "/admin/edit-profile/:id",
  authenticate,
  authorizeAdmin,
  UserController.AdminEdit,
);
router.post("/forgot-password", UserController.ForgotPassword);
router.post("/reset-password", UserController.ResetPassword);

router.get("/test-mail", async (req, res) => {
  try {
    await sendActivationEmail("lemaireenzo91@gmail.com", "test-token-123");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erreur lors de l'envoi de l'email",
      error: error.message,
    });
  }
  res.json({ success: true, message: "Email de test envoyé avec succès" });
});

module.exports = router;
