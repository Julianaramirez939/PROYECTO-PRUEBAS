const express = require("express");
const router = express.Router();
const categoriasController = require("../controllers/categoriasController");

// Crear categoría
router.post("/", categoriasController.crearCategoria);

// Obtener todas las categorías
router.get("/", categoriasController.obtenerCategorias);

// Obtener una categoría por ID
router.get("/:id", categoriasController.obtenerCategoriaPorId);

// Actualizar una categoría
router.put("/:id", categoriasController.actualizarCategoria);

// Eliminar una categoría
router.delete("/:id", categoriasController.eliminarCategoria);

module.exports = router;
