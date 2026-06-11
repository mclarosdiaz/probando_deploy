import {
  describe,
  expect,
  test,
  beforeEach
} from "@jest/globals";
import { buildTestApp } from "../utils/buildApp.js";
import { seedTestData } from "../../scripts/seedTestData.js";
import request from "supertest";
import dotenv from "dotenv";
dotenv.config();

describe("Notificacion API- Integracion", () => {
  
  let app;
  let seed;

  beforeEach(async () => {
    app = buildTestApp();

    seed = await seedTestData();
  });
  
  describe(`GET /usuarios/{idUsuarioPaciente}/notificaciones`, () => {
    
    test("Deberia retornar 200 mostrando las no leidas", async () => {
      const usuarioPaciente = seed.usuarioPaciente
      
      const response = await request(app)
        .get(`/usuario/${usuarioPaciente._id}/notificaciones`)
        .query({leidas: "false"});

      expect(response.status).toBe(200);
      expect(response.body.every((n) => n.leida === false)).toBe(true);
    });
  });

  describe("PATCH /usuarios/:idUsuario/:idNotificacion", () => {
    test("Deberia retornar 200 marcando como leida una notificacion", async () => {
      const usuarioPaciente = seed.usuarioPaciente
      const notificacion = seed.notificacion

      const response = await request(app).patch(
        `/usuario/${usuarioPaciente._id}/notificaciones/${notificacion._id}`,
      );
      expect(response.status).toBe(200);
    });
  });

  describe(`GET /usuarios/{idUsuarioPaciente}/notificaciones`, () => {
    test("Deberia retornar 200 mostrando las leidas", async () => {
      
      const usuarioPaciente = seed.usuarioPaciente
      const notificacion = seed.notificacion
      // Primero marcar como leída
      
       const patchResponse = await request(app).patch(
        `/usuario/${usuarioPaciente._id}/notificaciones/${notificacion._id}`,
      );
          
    console.log("PATCH status:", patchResponse.status)
    console.log("PATCH body:", JSON.stringify(patchResponse.body, null, 2))
      // Luego verificar que aparece como leída
      const response = await request(app)
        .get(`/usuario/${usuarioPaciente._id}/notificaciones`)
        .query({ leidas: "true" });
      console.log("Body recibido:", JSON.stringify(response.body, null, 2)) // ← agregar esto

      expect(response.status).toBe(200);
      expect(response.body.every((n) => n.leida === true)).toBe(true);
    });
  });
});
