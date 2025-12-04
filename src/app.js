const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const productosRoutes = require("./routes/productosRoutes");
const categoriasRoutes = require("./routes/categoriasRoutes");

const app = express();

// ===== HABILITAR CORS =====
app.use(cors({
  origin: "http://127.0.0.1:5500"
}));

app.use(bodyParser.json());
app.use(express.json());

// ===== RUTAS =====
app.use("/productos", productosRoutes);
app.use("/categorias", categoriasRoutes);

module.exports = app;
