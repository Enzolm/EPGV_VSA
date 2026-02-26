require("dotenv").config();
const db = require("../config/db_config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email et mot de passe requis" });
    }
    const query = "SELECT * FROM users WHERE email = ?";
    db.execute(query, [email])
      .then(async ([rows]) => {
        if (rows.length === 0) {
          return res.status(401).json({
            success: false,
            message: "Email ou mot de passe incorrect",
          });
        }

        if (rows[0].status === "desactivated") {
          return res.status(403).json({
            success: false,
            message: "Compte désactivé, veuillez contacter un administrateur",
          });
        }

        if (rows[0].status === "waiting_password") {
          return res.status(403).json({
            success: false,
            message:
              "Compte en attente d'activation, veuillez vérifier votre email",
          });
        }

        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({
            success: false,
            message: "Email ou mot de passe incorrect",
          });
        }
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "24h",
          },
        );
        res.json({ success: true, token });
      })
      .catch((err) => {
        console.error("Erreur lors de la requête de connexion:", err);
        res.status(500).json({ success: false, message: "Erreur serveur" });
      });
  } catch (err) {
    console.error("Erreur lors de la connexion:", err);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

const loggerTokenGetAccess = (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Token d'authentification requis" });
  }
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Token d'authentification invalide ",
        token,
      });
    }
    query =
      "SELECT id, email, nom, prenom, role, status, isAdmin FROM users WHERE id = ?";
    db.execute(query, [decoded.id])
      .then(([rows]) => {
        if (rows.length === 0) {
          return res.status(401).json({
            success: false,
            message: "Utilisateur non trouvé",
          });
        }
        res.json({ success: true, user: rows[0] });
      })
      .catch((err) => {
        console.error("Erreur lors de la vérification du token:", err);
        res.status(500).json({ success: false, message: "Erreur serveur" });
      });
  });
};

module.exports = {
  login,
  loggerTokenGetAccess,
};
