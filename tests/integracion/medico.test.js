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

describe("Medico API- Integracion", () => {
  let app;
  let seed
  

  beforeEach(async () => {
    app = buildTestApp();
    seed =  await seedTestData();
  });

  
  describe("POST /medicos/:id/servicios", () => {
    //AGREGAR SERVICIOS
    test("Debería retornar 200 agregando un servicio al medico", async () => {
      const medico = seed.medico
      
      const response = await request(app)
        .post(`/medico/${medico._id}/servicios`)
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
      const medico = seed.medico
      const servicio = medico.practicas[0]

      const response = await request(app).delete(
        `/medico/${medico._id}/servicios/practica/${servicio.id}`,
      );

      expect(response.status).toBe(200);
    });
  });

  describe("PUT /medicos/:id/modificarServicio", () => {
    
    // MODIFICAR SERVICIO
    test("Debería retornar 200 modificando un servicio", async () => {
      const medico = seed.medico
      const especialidad = medico.especialidades[1]

      const response = await request(app)
        .put(`/medico/${medico._id}/servicios/especialidad/${especialidad.id}`)
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
