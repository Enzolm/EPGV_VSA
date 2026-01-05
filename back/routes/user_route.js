const express = require("express");
const router = express.Router();
const sendActivationEmail =
  require("../services/mail.service").sendActivationEmail;

const UserController = require("../controllers/user_controller");

router.get("/get/all", UserController.getAllUsers);
router.get("/get/id/:id", UserController.get_user_by_id);
router.post("/create/admin", UserController.create_user_admin);
router.post("/activate/account", UserController.activateAccount);

router.get("/test-mail", async (req, res) => {
  try {
    await sendActivationEmail("lemaireenzo91@gmail.com", "test-token-123");
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Erreur lors de l'envoi de l'email",
        error: error.message,
      });
  }
  res.json({ success: true, message: "Email de test envoyé avec succès" });
});

module.exports = router;
