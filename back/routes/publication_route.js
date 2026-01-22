const experss = require("express");
const router = experss.Router();
const PublicationController = require("../controllers/publication_controller");

router.post("/create", PublicationController.createPublication);

router.get("/admin/all", PublicationController.getAllPublicationsADMIN);
router.get("/all", PublicationController.getAllPublications);

router.get("/id/:id", PublicationController.getPublicationById);

router.delete("/delete/:id", PublicationController.deletePublication);

module.exports = router;
