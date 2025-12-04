const { Productos, Categorias } = require("../models");

const crearProducto = async (data) => {
  const { nombre, categoria_id } = data;

  const categoria = await Categorias.findByPk(categoria_id);
  if (!categoria) {
    throw new Error("La categoría no existe");
  }

  const existente = await Productos.findOne({ where: { nombre } });
  if (existente) {
    throw new Error("Ya existe un producto con este nombre");
  }

  const producto = await Productos.create(data);
  return producto;
};

const obtenerProductos = async () => {
  const productos = await Productos.findAll({
    include: [
      {
        model: Categorias,
        attributes: ["id", "nombre"],
      },
    ],
  });
  return productos;
};

const obtenerProductoPorId = async (id) => {
  const producto = await Productos.findByPk(id);
  return producto;
};

const obtenerProductosPorCategoria = async (categoriaId) => {
  const productos = await Productos.findAll({
    where: { categoria_id: categoriaId },
  });
  return productos;
};

const actualizarProducto = async (id, data) => {
  const producto = await Productos.findByPk(id);
  if (!producto) {
    throw new Error("Producto no encontrado");
  }

  if (data.categoria_id) {
    const categoria = await Categorias.findByPk(data.categoria_id);
    if (!categoria) {
      throw new Error("La categoría no existe");
    }
  }

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
