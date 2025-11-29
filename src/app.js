const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes"); // 👈 importante

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Prefijo de la API
app.use("/api", routes); // 👈 aquí se monta TODO (/api/users, /api/books, etc.)

// Ruta raíz opcional
app.get("/", (req, res) => {
  res.json({ message: "API biblioteca funcionando. Usa /api/..." });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint no encontrado" });
});

module.exports = app;
