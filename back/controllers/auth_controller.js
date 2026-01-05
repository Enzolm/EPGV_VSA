const db = require("../config/db_config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const login = (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;
    if (!email || !mot_de_passe) {
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

        const user = rows[0];
        const mot_de_passeMatch = await bcrypt.compare(
          mot_de_passe,
          user.mot_de_passe
        );
        if (!mot_de_passeMatch) {
          return res.status(401).json({
            success: false,
            message: "Email ou mot de passe incorrect",
          });
        }
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            admin: user.administration,
            role: user.role,
          },
          JWT_SECRET,
          {
            expiresIn: "24h",
          }
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

const verify_token = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Token d'authentification requis" });
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "Token d'authentification invalide" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = {
  login,
  verify_token,
};
