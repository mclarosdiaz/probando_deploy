import { buildTestApp } from "../utils/buildApp.js"
import { seedTestData } from "../../scripts/seedTestData.js"
import { MongoTurnoRepository } from "../../server/repositories/turnoRepository.js"
import { MongoMedicoRepository } from "../../server/repositories/medicoRepository.js"
import { MongoPacienteRepository } from "../../server/repositories/pacienteRepository.js"
import {
    describe,
    beforeAll,
    beforeEach,
    afterAll,
    test,
    expect
} from "@jest/globals"
import request from "supertest"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

//import { ObraSocial } from "../../server/domain/obraSocial.js"

describe("Turno API- Integracion", () => {


    let app
    const turnoRepository = new MongoTurnoRepository()
    const pacienteRepository = new MongoPacienteRepository()
    const medicoRepository = new MongoMedicoRepository()

    const medicoId = new mongoose.Types.ObjectId("507f1f77bcf86cd799439011")
    const turnoId = new mongoose.Types.ObjectId("507f1f77bcf86cd799439012")
    const turnoSinReservarId = new mongoose.Types.ObjectId("507f1f77bcf86cd799439021")
    const pacienteId = new mongoose.Types.ObjectId("507f1f77bcf86cd799439013")
    const idUsuarioMedico = new mongoose.Types.ObjectId("507f1f77bcf86cd799439014")
    const idUsuarioPaciente = new mongoose.Types.ObjectId("507f1f77bcf86cd799439015")


    beforeAll(async () => {
        try {

            await mongoose.connect(
                `${process.env.MONGODB_URI}/${process.env.MONGODB_NAME}`,
                {
                    serverSelectionTimeoutMS: 3000
                }
            )

            console.log("Conectado a Mongo")

        } catch (error) {

            console.error(error)

            throw error
        }
    })
    beforeEach(async () => {

        await seedTestData()
        app = buildTestApp({ turnoRepository, pacienteRepository, medicoRepository })

    })

    afterAll(async () => {
        // await mongoose.disconnect()
    })

    describe("PATCH /turnos/:id/reservar", () => {
        test(`debería reservar un turno correctamente`, async () => {
            const response = await request(app)
                .patch(`/turnos/${turnoSinReservarId}/reservar`)
                .send({
                    pacienteId: pacienteId.toString()
                })

            expect(response.status).toBe(200)
        })

        test("debería fallar si falta el id de paciente", async () => {
            const response = await request(app)
                .patch(`/turnos/${turnoSinReservarId}/reservar`)
                .send({})


            expect(response.status).toBe(400)
        })

    })

    describe("GET /paciente/:pacienteId/turnos", () => {

        test("debería aceptar una query válida", async () => {
            const response = await request(app)
                .get(`/paciente/${pacienteId}/turnos`)
                .query({
                    
                    estado: "CONFIRMADO",
                    fechaDesde: "2026-05-01T00:00:00.000Z",
                    page: 1,
                    limit: 10
                })

            //  console.log(response.body)
            expect(response.status).toBe(200)
        })

        test("debería fallar si estado no pertenece al enum", async () => {
            const response = await request(app)
                .get(`/paciente/${pacienteId}/turnos`)
                .query({
                    estado: "PENDIENTE"
                })

            //console.log(response.body)

            expect(response.status).toBe(400)
        })


        test("debe retornar el historial de turnos", async () => {

            const response = await request(app)
                .get(`/paciente/${pacienteId}/turnos`)
                .query({
                    estado: "RESERVADO",
                    fechaDesde: new Date().toISOString(),
                    fechaHasta: "2026-06-19T00:00:00.000Z",
                    page: 1,
                    limit: 10
                })

            // console.log(response.body)

            expect(response.status).toBe(200)
            expect(response.body.data).toHaveLength(1)
            expect(response.body.paginacion.page).toBe("1")
            expect(response.body.paginacion.totalPages).toBe(1)
            expect(response.body.paginacion.total).toBe(1)
        })

    })

    describe("POST /turnos/123/cancelar", () => {
        test("deberia cancelar un turno correctamente", async () => {
            const response = await request(app)
                .post(`/turnos/${turnoId}/cancelar`)
                .send({
                    motivo: "No puedo asistir",
                    idUsuario: idUsuarioPaciente.toString()
                })
            //console.log(response.body)

            expect(response.status).toBe(200)
        })
    })

    describe("POST /turnos/generarTurnosDisponibles", () => {
        test("deberia retornar 200 con los turnos generados", async () => {
            const response = await request(app)
                .post("/turnos/disponibilidad")

            // console.log(response.body)
            expect(response.status).toBe(200)
        })
    })


    describe("PATCH /turnos/:id/modificarFecha", () => {
        test("deberia modificar la fecha de un query valida", async () => {
            const response = await request(app)
                .post(`/turnos/${turnoId}/modificacionFecha`)
                .send({
                    idUsuario: idUsuarioPaciente.toString(),
                    nuevaFecha: new Date("2026-06-24T18:00:00.000Z")
                })

            expect(response.status).toBe(200)
        })
    })

    describe("PATCH /turnos/:id/realizado", () => {
        test("deberia marcar como realizada una query valida", async () => {
            const response = await request(app)
                .patch(`/turnos/${turnoId}/realizado`)
                .send({
                    idUsuario: idUsuarioMedico.toString()
                })


            expect(response.status).toBe(200)
        })
    })

    describe("POST /disponibles/busqueda", () => {
        test("debería retornar los turnos con la cobertura calculada correctamente", async () => {
            const response = await request(app)
                .post(`/turnos/disponibles/busqueda`)
                .query({ page: 1, limit: 10 })
                .send({
                    idPaciente: pacienteId.toString(),
                    idMedico: medicoId.toString(),
                    idPractica: "1236"
                })

            expect(response.status).toBe(200)

            expect(response.body.turnosConCobertura).toBeDefined();
            expect(response.body.turnosConCobertura[0].cobertura).toBe("TOTAL");
            expect(response.body.turnosConCobertura[0].costo).toBe(0);
        })
    })
    //fallas

})
