const categoriasService = require("../services/categoriasService");

const crearCategoria = async (req, res) => {
  try {
    const categoria = await categoriasService.crearCategoria(req.body);
    res.status(201).json(categoria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await categoriasService.obtenerCategorias();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerCategoriaPorId = async (req, res) => {
  try {
    const categoria = await categoriasService.obtenerCategoriaPorId(
      req.params.id
    );
    if (!categoria)
      return res.status(404).json({ error: "Categoría no encontrada" });
    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const actualizarCategoria = async (req, res) => {
  try {
    const categoria = await categoriasService.actualizarCategoria(
      req.params.id,
      req.body
    );
    res.status(200).json(categoria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const eliminarCategoria = async (req, res) => {
  try {
    const result = await categoriasService.eliminarCategoria(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoriaPorId,
  actualizarCategoria,
  eliminarCategoria,
};
