import { buildTestApp } from "../utils/buildApp.js"
import { seedTestData } from "../../scripts/seedTestData.js"
import {
    describe,
    beforeEach,
    test,
    expect
} from "@jest/globals"
import request from "supertest"
import dotenv from "dotenv"
dotenv.config()

//import { ObraSocial } from "../../server/domain/obraSocial.js"

describe("Turno API- Integracion", () => {

    let app
    let seed
    
    beforeEach(async () => {
        app = buildTestApp()
        seed = await seedTestData()
    })


    describe("PATCH /turnos/:id/reservar", () => {
        test(`debería reservar un turno correctamente`, async () => {
            const turnoSinReservar = seed.turnoSinReservar 
            const paciente = seed.paciente

            const response = await request(app)
                .patch(`/turnos/${turnoSinReservar._id}/reservar`)
                .send({
                    pacienteId: paciente._id.toString()
                })

            expect(response.status).toBe(200)
        })

        test("debería fallar si falta el id de paciente", async () => {
            const turnoSinReservar = seed.turnoSinReservar
            
            const response = await request(app)
                .patch(`/turnos/${turnoSinReservar._id}/reservar`)
                .send({})


            expect(response.status).toBe(400)
        })

    })

    describe("GET /paciente/:pacienteId/turnos", () => {

        test("debería aceptar una query válida", async () => {
            const paciente = seed.paciente
            
            const response = await request(app)
                .get(`/paciente/${paciente._id}/turnos`)
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
            const paciente = seed.paciente

            const response = await request(app)
                .get(`/paciente/${paciente._id}/turnos`)
                .query({
                    estado: "PENDIENTE"
                })

            //console.log(response.body)

            expect(response.status).toBe(400)
        })


        test("debe retornar el historial de turnos", async () => {
            const paciente = seed.paciente

            const response = await request(app)
                .get(`/paciente/${paciente._id}/turnos`)
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
            const turnoReservado = seed.turno
            const usuarioPaciente = seed.usuarioPaciente

            const response = await request(app)
                .post(`/turnos/${turnoReservado._id}/cancelar`)
                .send({
                    motivo: "No puedo asistir",
                    idUsuario: usuarioPaciente._id.toString()
                })

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
            const turnoReservado = seed.turno
            const usuarioPaciente = seed.usuarioPaciente

            const response = await request(app)
                .post(`/turnos/${turnoReservado._id}/modificacionFecha`)
                .send({
                    idUsuario: usuarioPaciente._id.toString(),
                    nuevaFecha: new Date("2026-06-24T18:00:00.000Z")
                })

            expect(response.status).toBe(200)
        })
    })

    describe("PATCH /turnos/:id/realizado", () => {
        test("deberia marcar como realizada una query valida", async () => {
            const turnoReservado = seed.turno
            const usuarioMedico = seed.usuarioMedico

            const response = await request(app)
                .patch(`/turnos/${turnoReservado._id}/realizado`)
                .send({
                    idUsuario: usuarioMedico._id.toString()
                })


            expect(response.status).toBe(200)
        })
    })

    describe("POST /disponibles/busqueda", () => {

        test("debería retornar los turnos con la cobertura calculada correctamente", async () => {
            const paciente = seed.paciente
            const medico = seed.medico
            
            const response = await request(app)
                .post(`/turnos/disponibles/busqueda`)
                .query({ page: 1, limit: 10 })
                .send({
                    idPaciente: paciente._id.toString(),
                    idMedico: medico._id.toString(),
                    idPractica: "1236"
                })

            expect(response.status).toBe(200)

            expect(response.body.turnosConCobertura).toBeDefined();
            expect(response.body.turnosConCobertura[0].cobertura).toBe("TOTAL");
            expect(response.body.turnosConCobertura[0].costo).toBe(0);
        })
    })

})
