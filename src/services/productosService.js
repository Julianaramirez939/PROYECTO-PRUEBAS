const { Productos, Categorias } = require("../models");

// Crear producto con validaciones
const crearProducto = async (data) => {
  const { nombre, categoria_id } = data;

  // Validar que la categoría exista
  const categoria = await Categorias.findByPk(categoria_id);
  if (!categoria) {
    throw new Error("La categoría no existe");
  }

  // Validar si ya existe un producto con el mismo nombre
  const existente = await Productos.findOne({ where: { nombre } });
  if (existente) {
    throw new Error("Ya existe un producto con este nombre");
  }

  const producto = await Productos.create(data);
  return producto;
};

// Obtener todos
const obtenerProductos = async () => {
  const productos = await Productos.findAll();
  return productos;
};

// Obtener por ID
const obtenerProductoPorId = async (id) => {
  const producto = await Productos.findByPk(id);
  return producto;
};

// Obtener productos por categoría
const obtenerProductosPorCategoria = async (categoriaId) => {
  const productos = await Productos.findAll({
    where: { categoria_id: categoriaId },
  });
  return productos;
};

// Actualizar producto con validaciones
const actualizarProducto = async (id, data) => {
  const producto = await Productos.findByPk(id);
  if (!producto) {
    throw new Error("Producto no encontrado");
  }

  // Si cambia la categoría, validar que exista
  if (data.categoria_id) {
    const categoria = await Categorias.findByPk(data.categoria_id);
    if (!categoria) {
      throw new Error("La categoría no existe");
    }
  }

  // Si cambia el nombre, validar duplicado
  if (data.nombre) {
    const duplicado = await Productos.findOne({
      where: { nombre: data.nombre },
    });

    if (duplicado && duplicado.id !== producto.id) {
      throw new Error("Ya existe un producto con este nombre");
    }
  }

  const productoActualizado = await producto.update(data);
  return productoActualizado;
};

// Eliminar producto
const eliminarProducto = async (id) => {
  const producto = await Productos.findByPk(id);
  if (!producto) {
    throw new Error("Producto no encontrado");
  }

  await producto.destroy();
  return { mensaje: "Producto eliminado" };
};

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  obtenerProductosPorCategoria,
  actualizarProducto,
  eliminarProducto,
};
