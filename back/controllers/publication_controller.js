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

    if (req.file && (!uploadedFilePath || !fs.existsSync(uploadedFilePath))) {
      return res.status(400).json({
        success: false,
        message: "Upload image échoué",
      });
    }

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

    const publication = publications[0];
    const imageUrl = publication.img
      ? process.env.BACK_URL + `/uploads/${publication.img}`
      : null;

    res.json({ success: true, publication, imageUrl });
  } catch (err) {
    console.error("Erreur lors de la récupération de la publication:", err);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

const updatePublication = async (req, res) => {
  let uploadedFilePath = null;

  try {
    const publicationId = req.params.id;
    const { titre, type, statut, description, removeImage } = req.body;

    const getQuery =
      "SELECT img, publication_date FROM publication WHERE id_publication = ?";
    const [rows] = await db.execute(getQuery, [publicationId]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Publication non trouvée" });
    }

    const currentImg = rows[0].img;
    const currentDate = rows[0].publication_date;

    const newImg = req.file ? req.file.filename : null;
    uploadedFilePath = req.file ? req.file.path : null;

    if (req.file && (!uploadedFilePath || !fs.existsSync(uploadedFilePath))) {
      return res.status(400).json({
        success: false,
        message: "Upload image échoué",
      });
    }

    let finalImg = currentImg;

    if (req.file) {
      finalImg = newImg;
      if (currentImg) {
        const imgPath = path.join(__dirname, "..", "uploads", currentImg);
        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath);
        }
      }
    } else if (removeImage === "true" || removeImage === true) {
      finalImg = null;
      if (currentImg) {
        const imgPath = path.join(__dirname, "..", "uploads", currentImg);
        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath);
        }
      }
    }

    let publication_date;
    if (statut === "publie") {
      publication_date = currentDate || new Date();
    } else {
      publication_date = null;
    }

    const updateQuery =
      "UPDATE publication SET titre = ?, type = ?, statut = ?, img = ?, publication_date = ?, description = ? WHERE id_publication = ?";

    await db.execute(updateQuery, [
      titre,
      type,
      statut,
      finalImg,
      publication_date,
      description,
      publicationId,
    ]);

    res.json({
      success: true,
      message: "Publication mise à jour avec succès",
      imageUrl: finalImg ? process.env.BACK_URL + `/uploads/${finalImg}` : null,
    });
  } catch (err) {
    console.error("Erreur lors de la mise à jour de la publication:", err);

    if (uploadedFilePath && fs.existsSync(uploadedFilePath)) {
      try {
        fs.unlinkSync(uploadedFilePath);
      } catch (deleteErr) {
        console.error("Erreur lors de la suppression du fichier:", deleteErr);
      }
    }

    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

const deletePublication = async (req, res) => {
  try {
    const publicationId = req.params.id;

    const getImageQuery =
      "SELECT img, description FROM publication WHERE id_publication = ?";
    const [rows] = await db.execute(getImageQuery, [publicationId]);
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Publication non trouvée" });
    }
    const imgFilename = rows[0].img;
    const description = rows[0].description || "";

    const deleteQuery = "DELETE FROM publication WHERE id_publication = ?";
    await db.execute(deleteQuery, [publicationId]);
    if (imgFilename) {
      const imgPath = path.join(__dirname, "..", "uploads", imgFilename);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }

    const uploadBasePath = "/uploads/";
    const uploadRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    const embeddedFilenames = new Set();
    let match;

    while ((match = uploadRegex.exec(description)) !== null) {
      const src = match[1];
      if (typeof src !== "string") continue;

      const normalized = src.replace(/\\/g, "/");
      const uploadsIndex = normalized.lastIndexOf(uploadBasePath);
      if (uploadsIndex === -1) continue;

      const filename = normalized
        .slice(uploadsIndex + uploadBasePath.length)
        .split("?")[0]
        .split("#")[0];

      if (filename) {
        embeddedFilenames.add(filename);
      }
    }

    for (const filename of embeddedFilenames) {
      const embeddedPath = path.join(__dirname, "..", "uploads", filename);
      if (fs.existsSync(embeddedPath)) {
        try {
          fs.unlinkSync(embeddedPath);
        } catch (deleteErr) {
          console.error(
            "Erreur lors de la suppression d'image embarquée:",
            deleteErr,
          );
        }
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
  updatePublication,
  deletePublication,
};
