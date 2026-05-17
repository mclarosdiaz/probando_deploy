import request from "supertest"
import { describe, expect, jest, test, beforeEach } from "@jest/globals"
import { buildTestApp } from "../utils/buildApp.js"
import { Turno } from "../../server/domain/turno.js"
import { Paciente } from "../../server/domain/paciente.js"
import { Medico } from "../../server/domain/medico.js"
import { Sede } from "../../server/domain/sede.js"
import { date } from "zod"
import { EstadoTurno } from "../../server/domain/estadoTurno.js"
import { Usuario } from "../../server/domain/usuario.js"
import { Practica } from "../../server/domain/practica.js"
import { MongoTurnoRepository } from "../../server/repositories/turnoRepository.js"
import { MongoMedicoRepository } from "../../server/repositories/medicoRepository.js"
//import { ObraSocial } from "../../server/domain/obraSocial.js"

describe("Turno API- Integracion",()=>{
    let app
    let turnoRepository
    let fechaHora
    let medico
    let paciente
    let revision
    let sedeChacarita
    let usuarioMedico
    let usuarioPaciente
    let practicas
    let especialidades
    let sedes
    let disponibilidades
    let sedeItaliano
    let turnosMock

    beforeEach(()=>{
        turnoRepository={
            findall: jest.fn(),
            findById: jest.fn(),
            save: jest.fn(),
            saveAll: jest.fn(),
        }

        app=buildTestApp(MongoTurnoRepository, MongoMedicoRepository)
        
        fechaHora = new Date()

        usuarioMedico = new Usuario("1234", "Roberto", "1234")
        usuarioPaciente = new Usuario("1234", "pedroGimeenez", "Contraseña")

        revision = new Practica(
            "4679",
            "456789",
            "Revisión",
            30,
            5000
        )

        especialidades = [
            new Especialidad("5645",
                "Traumatología",
                60,
                10000
            ),
            new Especialidad("4568",
                "Oftalmología",
                45,
                75000
            )
        ]

        practicas = [
            revision,
            new Practica(
                "6598",
                "456745",
                "Ecografía",
                45,
                10000
            )
        ]

        sedeChacarita = new Sede("222", "Chacarita jr", "Gutierrez 351")
        sedeItaliano = new Sede("555", "Hospital Italiano", "Alto Pelado, San Luis")

        sedes = [
            new Sede("222", "Chacarita jr", "Gutierrez 351"),
            new Sede("555", "Hospital Italiano", "Alto Pelado, San Luis")
        ]

        disponibilidades = [
            new DisponibilidadHoraria(DiaSemana.VIERNES,
                "14:30",
                "17:00"
            ),
            new DisponibilidadHoraria(DiaSemana.MARTES,
                "12:00",
                "15:00"
            )
        ]
        medico = new Medico(
            "1234",
            usuarioMedico,
            "1234",
            "Roberto Gimenez",
            especialidades,
            practicas,
            sedes,
            disponibilidades
        )

        paciente = new Paciente(
            "1234",
            usuarioPaciente,
            "46254978",
            "Pedro Gimenez",

        )

        
        turnosMock = [
            new Turno(medico, fechaHora, sedeChacarita, EstadoTurno.RESERVADO, revision.costo)
        ]
        turnosMock[0].asignarPaciente(paciente)
        turnosMock[0].actualizarEstado(EstadoTurno.CONFIRMADO, usuarioPaciente, "Turno confirmado")
    })

    describe("GET /turnos/", () => {

         test("debería aceptar una query válida", async () =>{
            const response = await request(app)
                .get("/turnos/")
                .query({
                    pacienteId: "213456",
                    estado: "CONFIRMADO", 
                    fechaDesde: "2026-05-01T00:00:00.000Z",
                    page: 1, 
                    limit: 10
                })

            expect(response.status).toBe(200)
         })

        test("debería fallar si estado no pertenece al enum", async() =>{
            const response = await request(app)
                .get("/turnos")
                .query({
                    pacienteId: "032616",
                    estado: "PENDIENTE"
                })
                expect(response.status).toBe(400)
        })


        test("debe retornar el historial de turnos", async() => {
           
            
            const response = await request(app)
                .get("/").query({
                pacienteId: "1234",
                estado: CONFIRMADO,
                fechaDesde: fechaHora,
                fechaHasta: "2026-05-19T00:00:00.000Z",
                page: 1,
                limit: 10
            })

            expect(response.status).toBe(200)
            expect(response.body.data).toHaveLength(1)
            expect(response.body.status).toBe("succes")
            expect(response.body.paginacion.page).toBe(1)
            expect(response.body.paginacion.totalPages).toBe(10)
            expect(response.body.paginacion.total).toBe(1)
        })
        
    })


describe("PATCH /turnos/:id/reservar", () =>{
    test("debería reservar un turno correctamente", async () =>{
        const response = await request(app)
            .post("/turnos/123/reservar")
            .send({
                pacienteId: "456"
            })

        expect(response.status).toBe(200)
    })  

    test("debería fallar si falta el id", async() =>{
        const response = await request(app)
        .post("/turnos/123/reservar")
        .send({})

        expect(response.status).toBe(400)
    })

})

describe("PATCH /turnos/:id/cancelar",()=>{
    test("deberia cancelar una query valida",async()=>{
        const response = await request(app)
        .get("/turnos/:id/cancelar")
        .query({
            pacienteID:"1234",
            estado:"CONFIRMADO",
            fechaDesde: "2026-05-01T00:00:00.000Z",
            page: 1,
            limit: 10
        })

        expect(response.status).toBe(200)
    })
})

describe ("POST /turnos/generarTurnosDisponibles",()=>{
    test("deberia retornar 200 con los turnos generados",async()=>{
        const response = await request(app)
        .post("turnos/generarTurnosDisponibles")
        
        expect(response.status).toBe(200)
    })
})


describe ("PATCH /turnos/:id/modificarFecha",()=>{
    test("deberia modificar la fecha de un query valida",async()=>{
        const response = await request(app)
        .get("/turnos/:id/modificarFecha")
        .query({
            pacienteID:"1234",
            estado:"CONFIRMADO",
            fechaDesde: "2026-05-01T00:00:00.000Z",
            page: 1,
            limit: 10
        })

        expect(response.status).toBe(200)
    })
})

describe("PATCH /turnos/:id/realizado",()=>{
    test("deberia marcar como realizada una query valida",async()=>{
        const response = await request(app)
        .get("/turnos/:id/realizado")
        .query({
            pacienteID:"1234",
            estado:"CONFIRMADO",
            fechaDesde: "2026-05-01T00:00:00.000Z",
            page: 1,
            limit: 10
        })

        expect(response.status).toBe(200)
    })
})

    
}) 