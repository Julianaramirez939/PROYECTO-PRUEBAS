const { sequelize, Categorias } = require("../../src/models");
const productosService = require("../../src/services/productosService");

beforeAll(async () => {
  await sequelize.sync({ force: true });

  await Categorias.create({ nombre: "Ropa" });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Integración - Productos Service", () => {
  test("Crear producto", async () => {
    const producto = await productosService.crearProducto({
      nombre: "Remera",
      descripcion: "Algodón",
      precio: 1000,
      cantidad: 5,
      categoria_id: 1,
    });

    expect(producto.nombre).toBe("Remera");
  });

  test("No permite productos duplicados", async () => {
    await expect(
      productosService.crearProducto({
        nombre: "Remera",
        descripcion: "Duplicado",
        precio: 1500,
        cantidad: 2,
        categoria_id: 1,
      })
    ).rejects.toThrow("Ya existe un producto con este nombre");
  });

  test("Actualizar producto", async () => {
    const updated = await productosService.actualizarProducto(1, {
      precio: 1200,
    });

    expect(updated.precio).toBe(1200);
  });

  test("Eliminar producto", async () => {
    const result = await productosService.eliminarProducto(1);
    expect(result.mensaje).toBe("Producto eliminado");
  });
});
