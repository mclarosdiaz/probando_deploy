import {
  describe,
  expect,
  jest,
  test,
  beforeEach,
  beforeAll,
  afterAll,
} from "@jest/globals";
import { buildTestApp } from "../utils/buildApp.js";
import { Turno } from "../../server/domain/turno.js";
import { Paciente } from "../../server/domain/paciente.js";
import { Medico } from "../../server/domain/medico.js";
import { Sede } from "../../server/domain/sede.js";
import { date } from "zod";
import { EstadoTurno } from "../../server/domain/estadoTurno.js";
import { Usuario } from "../../server/domain/usuario.js";
import { Practica } from "../../server/domain/practica.js";
import { ObraSocial } from "../../server/domain/obraSocial.js";
import { Especialidad } from "../../server/domain/especialidad.js";
import { DisponibilidadHoraria } from "../../server/domain/disponibilidadHoraria.js";
import { DiaSemana } from "../../server/domain/diaSemana.js";
import { seedTestData } from "../../scripts/seedTestData.js";
import { MongoMedicoRepository } from "../../server/repositories/medicoRepository.js";
import { MongoTurnoRepository } from "../../server/repositories/turnoRepository.js";
import { MongoPacienteRepository } from "../../server/repositories/pacienteRepository.js";
import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

describe("Medico API- Integracion", () => {
  let app;
  const turnoRepository = new MongoTurnoRepository();
  const medicoRepository = new MongoMedicoRepository();
  const pacienteRepository = new MongoPacienteRepository();
  const medicoId = new mongoose.Types.ObjectId("507f1f77bcf86cd799439011");
  const idServicio = "1237"
  beforeAll(async () => {
    try {
      await mongoose.connect(
        `${process.env.MONGODB_URI}/${process.env.MONGODB_NAME}`,
        {
          serverSelectionTimeoutMS: 3000,
        },
      );

      console.log("Conectado a Mongo");
    } catch (error) {
      console.error(error);

      throw error;
    }
  });

  beforeEach(async () => {
    app = buildTestApp({
      turnoRepository,
      pacienteRepository,
      medicoRepository,
    });

    await seedTestData();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("POST /medicos/:id/servicios", () => {
    //AGREGAR SERVICIOS
    test("Debería retornar 200 agregando un servicio al medico", async () => {
      const response = await request(app)
        .post(`/medico/${medicoId}/servicios`)
        .send({
          tipoServicio: "especialidad",
          nuevoServicioDTO: {
            id: "4568",
            nombre: "Oftalmología",
            duracionTurnoEnMins: 45,
            costo: 75000,
          },
        });
      console.log(response.status, response.body, response.error);
      expect(response.status).toBe(200);
    });
  });

  describe("DELETE /medicos/:id/eliminarServicio/:idServicio", () => {
    //ELIMINAR SERVICIO
    test("Debería retornar 200 eliminando un servicio", async () => {
      const response = await request(app).delete(
        `/medico/${medicoId}/servicios/practica/${idServicio}`,
      );

      expect(response.status).toBe(200);
    });
  });

  describe("PUT /medicos/:id/modificarServicio", () => {
    // MODIFICAR SERVICIO
    test("Debería retornar 200 modificando un servicio", async () => {
      const response = await request(app)
        .put(`/medico/${medicoId}/servicios/especialidad/1235`)
        .send({
          id: "1235",
          nombre: "Diagnóstico",
          duracionTurnoEnMins: 60,
          costo: 30000,
        });
      expect(response.status).toBe(200);
    });
  });
});
