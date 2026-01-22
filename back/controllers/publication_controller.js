const db = require("../config/db_config");
const fs = require("fs");
const path = require("path");

const createPublication = async (req, res) => {
  let uploadedFilePath = null;

  try {
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);
    const { titre, type, statut, description } = req.body;

    // Le nom du fichier WebP converti est disponible ici
    const img = req.file ? req.file.filename : null;
    uploadedFilePath = req.file ? req.file.path : null;

    if (!titre || !type || !statut || !description) {
      // Supprimer le fichier si les champs sont invalides
      if (uploadedFilePath && fs.existsSync(uploadedFilePath)) {
        fs.unlinkSync(uploadedFilePath);
      }

      return res.status(400).json({
        success: false,
        message: "Tous les champs sont requis",
      });
    }

    let publication_date;
    if (statut === "publie") {
      publication_date = new Date();
    } else {
      publication_date = null;
    }

    console.log("Données pour insertion:", {
      titre,
      type,
      statut,
      img,
      publication_date,
      description,
    });

    const query =
      "INSERT INTO publication (titre, type, statut, img, publication_date, description) VALUES (?, ?, ?, ?, ?, ?)";

    const [result] = await db.execute(query, [
      titre,
      type,
      statut,
      `${img}`,
      publication_date,
      description,
    ]);

    res.json({
      success: true,
      message: "Publication créée avec succès",
      publicationId: result.insertId,
      imageUrl: img ? process.env.BACK_URL + `/uploads/${img}` : null,
    });
  } catch (err) {
    console.error("Erreur lors de la création de la publication:", err);

    // Supprimer le fichier uploadé en cas d'erreur
    if (uploadedFilePath && fs.existsSync(uploadedFilePath)) {
      try {
        fs.unlinkSync(uploadedFilePath);
        console.log("Fichier supprimé suite à l'erreur:", uploadedFilePath);
      } catch (deleteErr) {
        console.error("Erreur lors de la suppression du fichier:", deleteErr);
      }
    }

    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

const getAllPublicationsADMIN = async (req, res) => {
  try {
    const query = "SELECT * FROM publication ORDER BY id_publication DESC";
    const [publications] = await db.execute(query);
    res.json({ success: true, publications });
  } catch (err) {
    console.error("Erreur lors de la récupération des publications:", err);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

const getAllPublications = async (req, res) => {
  try {
    const query =
      "SELECT * FROM publication WHERE statut = 'publie' ORDER BY publication_date DESC";
    const [publications] = await db.execute(query);
    res.json({ success: true, publications });
  } catch (err) {
    console.error("Erreur lors de la récupération des publications:", err);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

const getPublicationById = async (req, res) => {
  try {
    const publicationId = req.params.id;
    const query = "SELECT * FROM publication WHERE id_publication = ?";
    const [publications] = await db.execute(query, [publicationId]);
    if (publications.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Publication non trouvée" });
    }
    res.json({ success: true, publication: publications[0] });
  } catch (err) {
    console.error("Erreur lors de la récupération de la publication:", err);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

const deletePublication = async (req, res) => {
  try {
    const publicationId = req.params.id;

    const getImageQuery =
      "SELECT img FROM publication WHERE id_publication = ?";
    const [rows] = await db.execute(getImageQuery, [publicationId]);
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Publication non trouvée" });
    }
    const imgFilename = rows[0].img;

    const deleteQuery = "DELETE FROM publication WHERE id_publication = ?";
    await db.execute(deleteQuery, [publicationId]);
    if (imgFilename) {
      const imgPath = path.join(__dirname, "..", "uploads", imgFilename);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }

    res.json({ success: true, message: "Publication supprimée avec succès" });
  } catch (err) {
    console.error("Erreur lors de la suppression de la publication:", err);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

module.exports = {
  createPublication,
  getAllPublicationsADMIN,
  getAllPublications,
  getPublicationById,
  deletePublication,
};
