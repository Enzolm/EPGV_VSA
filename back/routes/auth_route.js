const experss = require("express");
const router = experss.Router();
const AuthController = require("../controllers/auth_controller");

router.post("/login", AuthController.login);
router.get("/verify-token", AuthController.verify_token);

module.exports = router;
