const db = require("../config/db_config");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendActivationEmail =
  require("../services/mail.service").sendActivationEmail;

const path = require("path");
const fs = require("fs");

const getAllUsers = (req, res) => {
  const query =
    "SELECT id, email, nom, prenom, role, isAdmin, status, created_at, updated_at FROM users";
  db.execute(query)
    .then(([rows]) => {
      res.json({ success: true, users: rows });
    })
    .catch((err) => {
      console.error("Erreur lors de la récupération des utilisateurs:", err);
      res.status(500).json({ success: false, message: "Erreur serveur" });
    });
};

const create_user_admin = async (req, res) => {
  const { nom, prenom, email, role, isAdmin } = req.body;
  let conn;

  try {
    conn = await db.getConnection();
    await conn.beginTransaction();

    const [result] = await conn.execute(
      `INSERT INTO users (nom, prenom, email, role, isAdmin)
     VALUES (?, ?, ?, ?, ?)`,
      [nom, prenom, email, role, isAdmin],
    );

    const userId = result.insertId;
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await conn.execute(
      `INSERT INTO user_activation_tokens (user_id, token, expires_at)
     VALUES (?, ?, ?)`,
      [userId, token, expiresAt],
    );
    await conn.commit();
    await sendActivationEmail(email, token);

    res.json({ success: true, message: "Utilisateur admin créé avec succès" });
  } catch (err) {
    if (conn) await conn.rollback();
    console.error("Erreur lors de la création de l'utilisateur admin:", err);
    if (err.code === "ER_DUP_ENTRY") {
      return res
        .status(400)
        .json({ success: false, message: "Email déjà utilisé" });
    } else {
      res.status(500).json({ success: false, message: "Erreur serveur" });
    }
  } finally {
    if (conn) conn.release();
  }
};

const tokenValideChecker = async (req, res) => {
  const token = req.params.token;
  const [rows] = await db.execute(
    `SELECT user_id, expires_at, used_at
     FROM user_activation_tokens
     WHERE token = ?`,
    [token],
  );
  if (!rows.length) {
    return { valid: false, message: "Token invalide" };
  }
  const data = rows[0];
  if (data.used_at) {
    return res
      .status(400)
      .json({ valid: false, message: "Token déjà utilisé" });
  }
  if (new Date(data.expires_at) < new Date()) {
    return res.status(400).json({ valid: false, message: "Token expiré" });
  }
  return res.json({ valid: true, userId: data.user_id });
};

const activateAccount = async (req, res) => {
  const { token, password } = req.body;
  let conn;

  try {
    conn = await db.getConnection();
    await conn.beginTransaction();

    const [rows] = await conn.execute(
      `
    SELECT u.id, t.expires_at, t.used_at
    FROM user_activation_tokens t
    JOIN users u ON u.id = t.user_id
    WHERE t.token = ?
  `,
      [token],
    );

    if (!rows.length) {
      return res
        .status(400)
        .json({ success: false, message: "Token invalide" });
    }

    const data = rows[0];

    if (data.used_at || new Date(data.expires_at) < new Date()) {
      return res
        .status(400)
        .json({ success: false, message: "Token expiré ou déjà utilisé" });
    }

    const hash = await bcrypt.hash(password, 10);

    await conn.execute(
      `
    UPDATE users
    SET password = ?, status = 'active'
    WHERE id = ?
  `,
      [hash, data.id],
    );

    await conn.execute(
      `
    UPDATE user_activation_tokens
    SET used_at = NOW()
    WHERE token = ?
  `,
      [token],
    );

    await conn.commit();
    res.json({ success: true, message: "Compte activé avec succès" });
  } catch (err) {
    if (conn) await conn.rollback();
    console.error("Erreur lors de l'activation du compte:", err);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  } finally {
    if (conn) conn.release();
  }
};

const lockAccount = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await db.execute(
      `UPDATE users SET status = 'desactivated' WHERE id = ?`,
      [id],
    );

    res.json({ success: true, message: "Compte désactivé avec succès" });
  } catch (err) {
    console.error("Erreur lors de la désactivation du compte:", err);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

const unlockAccount = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await db.execute(
      `UPDATE users SET status = 'active' WHERE id = ?`,
      [id],
    );

    res.json({ success: true, message: "Compte réactivé avec succès" });
  } catch (err) {
    console.error("Erreur lors de la réactivation du compte:", err);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

const deleteAccount = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await db.execute(`DELETE FROM users WHERE id = ?`, [id]);

    res.json({ success: true, message: "Compte supprimé avec succès" });
  } catch (err) {
    console.error("Erreur lors de la suppression du compte:", err);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

const userById = async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await db.execute(
      `SELECT id, email, nom, prenom, role, isAdmin, status, created_at, updated_at
       FROM users
       WHERE id = ?`,
      [id],
    );
    if (rows.length) {
      res.json(rows[0]);
    } else {
      res
        .status(404)
        .json({ success: false, message: "Utilisateur non trouvé" });
    }
  } catch (err) {
    console.error(
      "Erreur lors de la récupération de l'utilisateur par ID:",
      err,
    );
    throw err;
  }
};

const USER_UPLOADS_DIR = path.join(__dirname, "..", "uploads", "users");
const DEFAULT_PROFILE_IMAGE_PATH = path.join(USER_UPLOADS_DIR, "user.svg");

const getProfileImage = async (req, res) => {
  // sécurise le nom de fichier
  const filename = path.basename(req.params.filename || "");
  const requestedFilePath = path.join(USER_UPLOADS_DIR, filename);

  try {
    // ✅ fs.promises.access (pas fs.access direct avec await)
    await fs.promises.access(requestedFilePath, fs.constants.F_OK);
    return res.sendFile(requestedFilePath);
  } catch {
    try {
      await fs.promises.access(DEFAULT_PROFILE_IMAGE_PATH, fs.constants.F_OK);
      return res.sendFile(DEFAULT_PROFILE_IMAGE_PATH);
    } catch (defaultErr) {
      console.error("Image par défaut introuvable:", defaultErr);
      return res.status(404).json({
        success: false,
        message: "Image de profil et image par défaut non trouvées.",
      });
    }
  }
};

const editProfile = async (req, res) => {
  const userId = req.params.id;
  const { nom, prenom, email } = req.body;

  if (!nom || !prenom || !email) {
    return res
      .status(400)
      .json({ success: false, message: "Tous les champs sont requis" });
  }

  try {
    await db.execute(
      `UPDATE users SET nom = ?, prenom = ?, email = ? WHERE id = ?`,
      [nom, prenom, email, userId],
    );
    res.json({ success: true, message: "Profil mis à jour avec succès" });
  } catch (err) {
    console.error("Erreur lors de la mise à jour du profil:", err);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

const AdminEdit = async (req, res) => {
  const userId = req.params.id;
  const { nom, prenom, email, role, isAdmin } = req.body;

  if (!nom || !prenom || !email || !role) {
    return res
      .status(400)
      .json({ success: false, message: "Tous les champs sont requis" });
  }

  try {
    await db.execute(
      `UPDATE users SET nom = ?, prenom = ?, email = ?, role = ?, isAdmin = ? WHERE id = ?`,
      [nom, prenom, email, role, isAdmin, userId],
    );
    res.json({ success: true, message: "Profil mis à jour avec succès" });
  } catch (err) {
    console.error("Erreur lors de la mise à jour du profil:", err);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

module.exports = {
  getAllUsers,
  create_user_admin,
  tokenValideChecker,
  activateAccount,
  lockAccount,
  unlockAccount,
  deleteAccount,
  userById,
  getProfileImage,
  editProfile,
  AdminEdit,
};
