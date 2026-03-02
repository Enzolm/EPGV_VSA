const experss = require("express");
const router = experss.Router();
const AuthController = require("../controllers/auth_controller");

router.post("/login", AuthController.login);
router.get("/verify-token", AuthController.loggerTokenGetAccess);
router.put("/change-password/:id", AuthController.changePassword);

module.exports = router;
