import {
  describe,
  expect,
  test,
  beforeEach
} from "@jest/globals";
import { buildTestApp } from "../utils/buildApp.js";
import { MongoNotificacionRepository } from "../../server/repositories/notificacionRepository.js";
import { seedTestData } from "../../scripts/seedTestData.js";
import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

describe("Notificacion API- Integracion", () => {
  let app;

  const notificacionRepository = new MongoNotificacionRepository();
  const idUsuarioPaciente = new mongoose.Types.ObjectId(
    "507f1f77bcf86cd799439015",
  );
  const notificacionId = new mongoose.Types.ObjectId(
    "507f1f77bcf86cd799439016",
  );

  
  beforeEach(async () => {
    app = buildTestApp({ notificacionRepository });

    await seedTestData();
  });
  
  describe(`GET /usuarios/${idUsuarioPaciente}/notificaciones`, () => {
    
    test("Deberia retornar 200 mostrando las no leidas", async () => {
      const response = await request(app)
        .get(`/usuario/${idUsuarioPaciente}/notificaciones`)
        .query((leida = "false"));

      expect(response.status).toBe(200);
      expect(response.body.every((n) => n.leida === false)).toBe(true);
    });
  });

  describe("PATCH /usuarios/:idUsuario/:idNotificacion", () => {
    test("Deberia retornar 200 marcando como leida una notificacion", async () => {
      const response = await request(app).patch(
        `/usuario/${idUsuarioPaciente}/notificaciones/${notificacionId}`,
      );
      expect(response.status).toBe(200);
    });
  });
  
  describe(`GET /usuarios/${idUsuarioPaciente}/notificaciones`, () => {
    test("Deberia retornar 200 mostrando las leidas", async () => {
      // Primero marcar como leída
       const patchResponse = await request(app).patch(
        `/usuario/${idUsuarioPaciente}/notificaciones/${notificacionId}`,
      );
          
    console.log("PATCH status:", patchResponse.status)
    console.log("PATCH body:", JSON.stringify(patchResponse.body, null, 2))
      // Luego verificar que aparece como leída
      const response = await request(app)
        .get(`/usuario/${idUsuarioPaciente}/notificaciones`)
        .query({ leida: "true" });
      console.log("Body recibido:", JSON.stringify(response.body, null, 2)) // ← agregar esto

      expect(response.status).toBe(200);
      expect(response.body.every((n) => n.leida === true)).toBe(true);
    });
  });
});
