const { sequelize } = require("../../src/models");
const categoriasService = require("../../src/services/categoriasService");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Integración - Categorías Service", () => {
  test("Crear categoría", async () => {
    const categoria = await categoriasService.crearCategoria({
      nombre: "Electronica",
    });

    expect(categoria.nombre).toBe("Electronica");
  });

  test("No permite duplicados", async () => {
    await expect(
      categoriasService.crearCategoria({ nombre: "Electronica" })
    ).rejects.toThrow("Ya existe una categoría con este nombre");
  });

  test("Actualizar categoría", async () => {
    const updated = await categoriasService.actualizarCategoria(1, {
      nombre: "Tecnología",
    });

    expect(updated.nombre).toBe("Tecnología");
  });

  test("Eliminar categoría sin productos", async () => {
    const result = await categoriasService.eliminarCategoria(1);

    expect(result.mensaje).toBe("Categoría eliminada");
  });
});
