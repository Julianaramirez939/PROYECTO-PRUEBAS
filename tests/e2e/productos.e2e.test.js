const request = require("supertest");
const app = require("../../src/app");
const { sequelize, Categorias } = require("../../src/models");

let server;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Crear categoría inicial
  await Categorias.create({ nombre: "Ropa" });

  // Levantar servidor temporal para supertest
  server = app.listen(4001);
});

afterAll(async () => {
  await sequelize.close();
  server.close();
});

describe("E2E - Productos", () => {
  test("POST /productos - crear", async () => {
    const res = await request(server).post("/productos").send({
      nombre: "Remera",
      descripcion: "Algodón",
      precio: 1000,
      cantidad: 5,
      categoria_id: 1,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.nombre).toBe("Remera");
  });

  test("POST /productos - duplicado", async () => {
    const res = await request(server).post("/productos").send({
      nombre: "Remera",
      descripcion: "Otra",
      precio: 1500,
      cantidad: 3,
      categoria_id: 1,
    });

    expect(res.statusCode).toBe(400);
  });

  test("GET /productos", async () => {
    const res = await request(server).get("/productos");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test("PUT /productos/:id", async () => {
    const res = await request(server)
      .put("/productos/1")
      .send({ precio: 2500 });

    expect(res.statusCode).toBe(200);
    expect(res.body.precio).toBe(2500);
  });

  test("DELETE /productos/:id", async () => {
    const res = await request(server).delete("/productos/1");

    expect(res.statusCode).toBe(200);
  });
});
