const { Categorias, Productos } = require("../models");

// Crear categoría con validación de nombre repetido
const crearCategoria = async (data) => {
  const { nombre } = data;

  // Verificar si ya existe
  const existente = await Categorias.findOne({ where: { nombre } });
  if (existente) {
    throw new Error("Ya existe una categoría con este nombre");
  }

  const categoria = await Categorias.create(data);
  return categoria;
};

// Obtener todas
const obtenerCategorias = async () => {
  const categorias = await Categorias.findAll();
  return categorias;
};

// Obtener por ID
const obtenerCategoriaPorId = async (id) => {
  const categoria = await Categorias.findByPk(id);
  return categoria;
};

// Actualizar categoría con validación de duplicado
const actualizarCategoria = async (id, data) => {
  const categoria = await Categorias.findByPk(id);
  if (!categoria) {
    throw new Error("Categoría no encontrada");
  }

  if (data.nombre) {
    const duplicado = await Categorias.findOne({
      where: { nombre: data.nombre },
    });

    if (duplicado && duplicado.id !== id) {
      throw new Error("Ya existe otra categoría con este nombre");
    }
  }

  const categoriaActualizada = await categoria.update(data);
  return categoriaActualizada;
};

// ❌ NO permitir eliminar categorías con productos asociados
const eliminarCategoria = async (id) => {
  const categoria = await Categorias.findByPk(id);
  if (!categoria) {
    throw new Error("Categoría no encontrada");
  }

  // Buscar si la categoría tiene productos
  const productosAsociados = await Productos.findOne({
    where: { categoria_id: id },
  });

  if (productosAsociados) {
    throw new Error(
      "No se puede eliminar la categoría porque tiene productos asociados"
    );
  }

  await categoria.destroy();
  return { mensaje: "Categoría eliminada" };
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoriaPorId,
  actualizarCategoria,
  eliminarCategoria,
};
