const express = require("express");
const router = express.Router();
const sendActivationEmail =
  require("../services/mail.service").sendActivationEmail;

const UserController = require("../controllers/user_controller");

router.post("/create/admin", UserController.create_user_admin);
router.get("/token/creation/check/:token", UserController.tokenValideChecker);
router.post("/activate/account", UserController.activateAccount);
router.get("/get/all", UserController.getAllUsers);
router.get("/account/lock/:id", UserController.lockAccount);
router.get("/account/unlock/:id", UserController.unlockAccount);
router.delete("/account/delete/:id", UserController.deleteAccount);

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
