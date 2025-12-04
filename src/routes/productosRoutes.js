const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productosController");

// Crear producto
router.post("/", productosController.crearProducto);

// Obtener todos los productos
router.get("/", productosController.obtenerProductos);

// Obtener producto por ID
router.get("/:id", productosController.obtenerProductoPorId);

// Obtener productos por categoría
router.get(
  "/categoria/:categoriaId",
  productosController.obtenerProductosPorCategoria
);

// Actualizar producto
router.put("/:id", productosController.actualizarProducto);

// Eliminar producto
router.delete("/:id", productosController.eliminarProducto);

module.exports = router;
