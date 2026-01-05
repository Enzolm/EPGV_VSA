const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

(async () => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT CURRENT_USER()");
    console.log(
      "Connecté à la base de données en tant que :",
      rows[0]["CURRENT_USER()"]
    );
    connection.release(); // Libérer la connexion
  } catch (err) {
    console.error(
      "Erreur lors de la récupération de l'utilisateur courant:",
      err
    );
  }
})();

module.exports = pool;
