const jwt = require("jsonwebtoken");
const db = require("../config/db_config");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        success: false,
        message: "Token d'authentification requis",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    const query =
      "SELECT id, email, nom, prenom, role, status, isAdmin FROM users WHERE id = ? LIMIT 1";
    const [rows] = await db.execute(query, [decoded.id]);

    if (!rows || rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }

    const user = rows[0];

    if (user.status === "desactivated") {
      return res.status(403).json({
        success: false,
        message: "Compte désactivé",
      });
    }

    // Important: on fait confiance à la DB, pas au token
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      code: "INVALID_TOKEN",
      message: "Token d'authentification invalide",
    });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user?.isAdmin) return next();
  return res.status(403).json({
    success: false,
    message: "Accès refusé (admin requis)",
  });
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (req.user?.isAdmin) return next(); // admin bypass
    if (roles.includes(req.user?.role)) return next();

    return res.status(403).json({
      success: false,
      message: "Accès refusé (rôle insuffisant)",
    });
  };
};

module.exports = {
  authenticate,
  authorizeAdmin,
  authorizeRoles,
};
