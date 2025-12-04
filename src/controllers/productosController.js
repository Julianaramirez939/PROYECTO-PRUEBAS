const productosService = require("../services/productosService");

const crearProducto = async (req, res) => {
  try {
    const producto = await productosService.crearProducto(req.body);
    res.status(201).json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const obtenerProductos = async (req, res) => {
  try {
    const productos = await productosService.obtenerProductos();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await productosService.obtenerProductoPorId(req.params.id);
    if (!producto)
      return res.status(404).json({ error: "Producto no encontrado" });
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerProductosPorCategoria = async (req, res) => {
  try {
    const categoriaId = req.params.categoriaId || req.query.categoriaId;
    const productos = await productosService.obtenerProductosPorCategoria(
      categoriaId
    );
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const producto = await productosService.actualizarProducto(
      req.params.id,
      req.body
    );
    res.status(200).json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const result = await productosService.eliminarProducto(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  obtenerProductosPorCategoria,
  actualizarProducto,
  eliminarProducto,
};
