const express = require("express");
const bodyParser = require("body-parser");

const productosRoutes = require("./routes/productosRoutes");
const categoriasRoutes = require("./routes/categoriasRoutes");

const app = express();
app.use(bodyParser.json());

app.use("/productos", productosRoutes);
app.use("/categorias", categoriasRoutes);

module.exports = app;
