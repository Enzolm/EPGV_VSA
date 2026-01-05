const db = require("../config/db_config");
const bcrypt = require("bcrypt");

const getAllUsers = (req, res) => {
  const query = "SELECT id_user, email, administrateur, role FROM users";
  db.execute(query)
    .then(([rows]) => {
      res.json({ success: true, users: rows });
    })
    .catch((err) => {
      console.error("Erreur lors de la récupération des utilisateurs:", err);
      res.status(500).json({ success: false, message: "Erreur serveur" });
    });
};

const get_user_by_id = (req, res) => {
  const userId = req.params.id;
  const query =
    "SELECT id_user, email, administrateur, role FROM users WHERE id_user = ?";
  db.execute(query, [userId])
    .then(([rows]) => {
      if (rows.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Utilisateur non trouvé" });
      }
      res.json({ success: true, user: rows[0] });
    })
    .catch((err) => {
      console.error("Erreur lors de la récupération de l'utilisateur:", err);
      res.status(500).json({ success: false, message: "Erreur serveur" });
    });
};

const create_user_admin = async (req, res) => {
  const { nom, prenom, email, role } = req.body;

  const [result] = await db.execute(
    `INSERT INTO users (nom, prenom, email, role)
     VALUES (?, ?, ?, ?)`,
    [nom, prenom, email, role]
  );

  const userId = result.insertId;

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await db.execute(
    `INSERT INTO user_activation_tokens (user_id, token, expires_at)
     VALUES (?, ?, ?)`,
    [userId, token, expiresAt]
  );

  const link = `${process.env.FRONT_URL}/create_mdp/${token}`;
  await sendActivationEmail(email, link);

  res.json({ success: true, message: "Utilisateur admin créé avec succès" });
};

const activateAccount = async (req, res) => {
  const { token, mot_de_passe } = req.body;

  const [rows] = await db.execute(
    `
    SELECT u.id_user, t.expires_at, t.used
    FROM user_activation_tokens t
    JOIN users u ON u.id_user = t.user_id
    WHERE t.token = ?
  `,
    [token]
  );

  if (!rows.length) {
    return res.status(400).json({ error: "Token invalide" });
  }

  const data = rows[0];

  if (data.used || new Date(data.expires_at) < new Date()) {
    return res.status(400).json({ error: "Token expiré ou déjà utilisé" });
  }

  const hash = await bcrypt.hash(mot_de_passe, 10);

  await db.execute(
    `
    UPDATE users
    SET mot_de_passe = ?, statut = 'active', mot_de_passe_set = TRUE, visible = TRUE
    WHERE id_user = ?
  `,
    [hash, data.id_user]
  );

  await db.execute(
    `
    UPDATE user_activation_tokens
    SET used = TRUE
    WHERE token = ?
  `,
    [token]
  );

  res.json({ success: true });
};

module.exports = {
  getAllUsers,
  create_user_admin,
  get_user_by_id,
  activateAccount,
};
