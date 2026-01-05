const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db_config");
const auth_routes = require("./routes/auth_route");
const user_routes = require("./routes/user_route");

dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.FRONT_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/auth", auth_routes);
app.use("/api/users", user_routes);

app.listen(3000, () => {
  console.log("✅ Serveur à l'écoute sur le port 3000");
});
