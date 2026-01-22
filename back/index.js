const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db_config");
const auth_routes = require("./routes/auth_route");
const user_routes = require("./routes/user_route");
const publication_routes = require("./routes/publication_route");
const multer = require("multer");
const path = require("path");
const sharp = require("sharp");

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const mimetype = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase(),
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(
      new Error("Seules les images sont acceptées (jpeg, jpg, png, gif, webp)"),
    );
  },
  limits: { fileSize: 20 * 1024 * 1024 },
});

const convertToWebP = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.webp`;
    const outputPath = path.join("uploads", filename);

    await sharp(req.file.buffer)
      .rotate() // Auto-rotation selon EXIF uniquement
      .webp({
        quality: 80,
        effort: 6,
      })
      .toFile(outputPath);

    req.file.filename = filename;
    req.file.path = outputPath;
    req.file.convertedToWebP = true;

    next();
  } catch (error) {
    console.error("Erreur lors de la conversion en WebP:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors du traitement de l'image",
    });
  }
};

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

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", auth_routes);
app.use("/api/users", user_routes);
app.use(
  "/api/publications",
  upload.single("img"),
  convertToWebP,
  publication_routes,
);

app.post("/api/upload", upload.single("img"), convertToWebP, (req, res) => {
  if (req.file) {
    res.json({
      success: true,
      filename: req.file.filename,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Aucun fichier téléchargé",
    });
  }
});

app.listen(3000, () => {
  console.log("✅ Serveur à l'écoute sur le port 3000");
});
