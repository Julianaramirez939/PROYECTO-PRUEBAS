const { sequelize } = require("../../src/models");
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoriaPorId,
  actualizarCategoria,
  eliminarCategoria,
} = require("../../src/services/categoriasService");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("CategoriasService - Pruebas Unitarias", () => {
  let categoriaId;

  test("crearCategoria debe crear una categoría", async () => {
    const categoria = await crearCategoria({ nombre: "Tecnología" });

    categoriaId = categoria.id;

    expect(categoria).toHaveProperty("id");
    expect(categoria.nombre).toBe("Tecnología");
  });

  test("crearCategoria debe fallar si el nombre está repetido", async () => {
    await expect(crearCategoria({ nombre: "Tecnología" })).rejects.toThrow(
      "Ya existe una categoría con este nombre"
    );
  });

  test("obtenerCategorias debe retornar listado", async () => {
    const categorias = await obtenerCategorias();
    expect(categorias.length).toBeGreaterThan(0);
  });

  test("obtenerCategoriaPorId debe retornar una categoría", async () => {
    const categoria = await obtenerCategoriaPorId(categoriaId);
    expect(categoria).not.toBeNull();
    expect(categoria.id).toBe(categoriaId);
  });

  test("actualizarCategoria debe modificar una categoría", async () => {
    const actualizado = await actualizarCategoria(categoriaId, {
      nombre: "Tecnología Editada",
    });

    expect(actualizado.nombre).toBe("Tecnología Editada");
  });

  test("actualizarCategoria debe fallar si el nombre está duplicado", async () => {
    await crearCategoria({ nombre: "Hogar" });

    await expect(
      actualizarCategoria(categoriaId, { nombre: "Hogar" })
    ).rejects.toThrow("Ya existe otra categoría con este nombre");
  });

  test("eliminarCategoria debe fallar si tiene productos asociados", async () => {
    const Productos = require("../../src/models/Productos");
    await Productos.create({
      nombre: "TestProd",
      descripcion: "X",
      precio: 10,
      cantidad: 1,
      categoria_id: categoriaId,
    });

    await expect(eliminarCategoria(categoriaId)).rejects.toThrow(
      "No se puede eliminar la categoría porque tiene productos asociados"
    );
  });
});
