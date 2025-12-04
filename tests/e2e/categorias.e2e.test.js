const request = require("supertest");
const app = require("../../src/app");
const { sequelize } = require("../../src/models");

let server;

beforeAll(async () => {
  await sequelize.sync({ force: true }); 
  server = app.listen(4000); 
});

afterAll(async () => {
  await sequelize.close();
  server.close(); 
});

describe("E2E - Categorías", () => {
  test("POST /categorias - crear", async () => {
    const res = await request(server).post("/categorias").send({
      nombre: "Electronica",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.nombre).toBe("Electronica");
  });

  test("POST /categorias - duplicada", async () => {
    const res = await request(server).post("/categorias").send({
      nombre: "Electronica",
    });

    expect(res.statusCode).toBe(400);
  });

  test("GET /categorias", async () => {
    const res = await request(server).get("/categorias");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test("PUT /categorias/:id", async () => {
    const res = await request(server)
      .put("/categorias/1")
      .send({ nombre: "Tech" });

    expect(res.statusCode).toBe(200);
    expect(res.body.nombre).toBe("Tech");
  });

  test("DELETE /categorias/:id", async () => {
    const res = await request(server).delete("/categorias/1");

    expect(res.statusCode).toBe(200);
  });
});
