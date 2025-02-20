const request = require("supertest");
const app = require("../index"); // Asegúrate de importar correctamente tu servidor
const { sequelize } = require("../config/sequelize");
const Monumento = require("../models/init-models").initModels(sequelize).monumentos;

describe("Pruebas para MonumentoController", () => {
  let monumentoCreado;

  beforeAll(async () => {
    await sequelize.sync(); // Asegura que la base de datos está sincronizada antes de ejecutar los tests
  });

  afterAll(async () => {
    await sequelize.close(); // Cierra la conexión después de las pruebas
  });

  /**
   * 1️⃣ PRUEBA: CREAR UN MONUMENTO
   */
  test("Debe crear un monumento", async () => {
    const res = await request(app)
      .post("/api/monumentos")
      .send({
        nombre: "Monumento Test",
        descripcion: "Descripción del monumento",
        ubicacion: "Ubicación de prueba"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.ok).toBe(true);
    expect(res.body.datos).toHaveProperty("id");
    monumentoCreado = res.body.datos;
  });

  /**
   * 2️⃣ PRUEBA: OBTENER TODOS LOS MONUMENTOS
   */
  test("Debe obtener todos los monumentos", async () => {
    const res = await request(app).get("/api/monumentos");

    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(Array.isArray(res.body.datos)).toBe(true);
  });

  /**
   * 3️⃣ PRUEBA: OBTENER UN MONUMENTO POR ID
   */
  test("Debe obtener un monumento por ID", async () => {
    const res = await request(app).get(`/api/monumentos/${monumentoCreado.id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.datos.id).toBe(monumentoCreado.id);
  });

  /**
   * 4️⃣ PRUEBA: ACTUALIZAR UN MONUMENTO
   */
  test("Debe actualizar un monumento", async () => {
    const res = await request(app)
      .put(`/api/monumentos/${monumentoCreado.id}`)
      .send({
        id: monumentoCreado.id,
        nombre: "Monumento Actualizado",
        descripcion: "Nueva descripción",
        ubicacion: "Nueva ubicación"
      });

    expect(res.statusCode).toBe(204);
  });

  /**
   * 5️⃣ PRUEBA: ELIMINAR UN MONUMENTO
   */
  test("Debe eliminar un monumento", async () => {
    const res = await request(app).delete(`/api/monumentos/${monumentoCreado.id}`);

    expect(res.statusCode).toBe(204);
  });

  /**
   * 6️⃣ PRUEBA: OBTENER MONUMENTOS POR NOMBRE
   */
  test("Debe obtener monumentos por nombre", async () => {
    await Monumento.create({
      nombre: "Monumento Especial",
      descripcion: "Para pruebas de búsqueda",
      ubicacion: "Test Location"
    });

    const res = await request(app).get("/api/monumentos/nombre?nombre=Monumento Especial");

    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.datos.length).toBeGreaterThan(0);
  });
});
