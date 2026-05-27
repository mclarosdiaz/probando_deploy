import request from "supertest"
import { describe, expect, jest, test, beforeEach } from "@jest/globals"
import { buildTestApp } from "../utils/buildApp.js"
import { Turno } from "../../server/domain/turno.js"
import { Paciente } from "../../server/domain/paciente.js"
import { Medico } from "../../server/domain/medico.js"
import { Sede } from "../../server/domain/sede.js"
import { EstadoTurno } from "../../server/domain/estadoTurno.js"
import { Usuario } from "../../server/domain/usuario.js"
import { Especialidad } from "../../server/domain/especialidad.js"
import { DisponibilidadHoraria } from "../../server/domain/disponibilidadHoraria.js"
import { Practica } from "../../server/domain/practica.js"
import { DiaSemana } from "../../server/domain/diaSemana.js"


//import { ObraSocial } from "../../server/domain/obraSocial.js"

describe("Turno API- Integracion",()=>{
    

    let app
    let turnoRepository
    let medicoRepository
    let pacienteRepository
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
        paciente.plan = {
            obtenerCoberturaPractica: jest.fn().mockReturnValue({ nivel: "TOTAL", costoAplicandoCobertura: 0 }),
            obtenerCoberturaEspecialidad: jest.fn().mockReturnValue(null)
        }

        const turno = new Turno(medico, 
                new Date(Date.now() + 1000 * 60 * 60 * 24), 
                sedeChacarita, 
                EstadoTurno.CONFIRMADO, 
                revision.costo)
        
        turno.asignarPaciente(paciente)
        
        
        turno.servicio = revision 

        turnosMock = [turno]
        
            //TODO mockear nuevas funciones

        turnoRepository = {
            findAll: jest.fn().mockResolvedValue({
                data: turnosMock,
                total: 1
            }),
            findById: 
                jest.fn().mockImplementation(async(id) => {
                    return id === "123"? turno: null
                }),
            save: jest.fn().mockImplementation(async (entidad) => entidad),
            saveAll: jest.fn().mockImplementation(async (entidades) => entidades),
        }
        
        medicoRepository = {
            save: jest.fn().mockImplementation(async(entidad) => entidad),
            findById: jest.fn().mockResolvedValue(medico),
            findAll: jest.fn().mockResolvedValue([medico])
        }

        pacienteRepository = {
            findById: jest.fn().mockResolvedValue(paciente)
        }

        app=buildTestApp({turnoRepository, pacienteRepository, medicoRepository})
        


        /*
        turnosMock = [
            new Turno(medico, fechaHora, sedeChacarita, EstadoTurno.RESERVADO, revision.costo)
        ]
        turnosMock[0].asignarPaciente(paciente)
        turnosMock[0].actualizarEstado(EstadoTurno.CONFIRMADO, usuarioPaciente, "Turno confirmado")
        turnosMock[0].servicio = revision
        */
    })

    describe("GET /turnos/", () => {

         test("debería aceptar una query válida", async () =>{
            const response = await request(app)
                .get("/turnos")
                .query({
                    pacienteId: "213456",
                    estado: EstadoTurno.CONFIRMADO, 
                    fechaDesde: "2026-05-01T00:00:00.000Z",
                    page: 1, 
                    limit: 10
                })

             console.log(response.body)
            expect(response.status).toBe(200)
         })

        test("debería fallar si estado no pertenece al enum", async() =>{
            const response = await request(app)
                .get("/turnos")
                .query({
                    pacienteId: "032616",
                    estado: "PENDIENTE"
                })

                console.log(response.body)

                expect(response.status).toBe(400)
        })


        test("debe retornar el historial de turnos", async() => {
            
            const response = await request(app)
                .get("/turnos")
                .query({
                    pacienteId: "1234",
                    estado: EstadoTurno.CONFIRMADO,
                    fechaDesde: fechaHora.toISOString(),
                    fechaHasta: "2026-05-19T00:00:00.000Z",
                    page: 1,
                    limit: 10
            })

            console.log(response.body)

            expect(response.status).toBe(200)
            expect(response.body.data).toHaveLength(1)
            expect(response.body.paginacion.page).toBe("1")
            expect(response.body.paginacion.totalPages).toBe(1)
            expect(response.body.paginacion.total).toBe(1)
        })
        
    })


describe("PATCH /turnos/123/reservar", () =>{
    test("debería reservar un turno correctamente", async () =>{
        const response = await request(app)
            .patch("/turnos/123/reservar")
            .send({
                pacienteId: "1234"
            })
        console.log(response.body)

        expect(response.status).toBe(200)
    })  

    test("debería fallar si falta el id", async() =>{
        const response = await request(app)
        .patch("/turnos/123/reservar")
        .send({})


        expect(response.status).toBe(400)
    })

})

describe("PATCH /turnos/123/cancelar",()=>{
    test("deberia cancelar un turno correctamente",async()=>{
        const response = await request(app)
            .patch("/turnos/123/cancelar")
            .send({
                motivo: "No puedo asistir",
                idUsuario: "1234"        
        })
        console.log(response.body)

        expect(response.status).toBe(204)
    })
})

describe ("POST /turnos/generarTurnosDisponibles",()=>{
    test("deberia retornar 200 con los turnos generados",async()=>{
        const response = await request(app)
        .post("/turnos/generarTurnosDisponibles")
       
        console.log(response.body)
        expect(response.status).toBe(200)
    })
})


describe ("PATCH /turnos/:id/modificarFecha",()=>{
    test("deberia modificar la fecha de un query valida",async()=>{
        const response = await request(app)
        .patch("/turnos/123/modificarFecha")
        .send({
            idUsuario: "1234",
            nuevaFecha: "2026-06-01T10:00:00.000Z"
        })

        expect(response.status).toBe(200)
    })
})

describe("PATCH /turnos/:id/realizado",()=>{
    test("deberia marcar como realizada una query valida",async()=>{
        const response = await request(app)
        .patch("/turnos/123/realizado")
        .send({
            idUsuario: "1234"
        })


        expect(response.status).toBe(200)
    })
})

describe("GET /turnos/:idPaciente/turnosDisponibles", () => {
    test("debería retornar los turnos con la cobertura calculada correctamente", async()=>{
        const response = await request(app)
            .get("/turnos/1234/turnosDisponibles")
            .query({ page: 1, limit:10 })
            .send({
                idMedico: "1234",
                idPractica: "4679"
            })

        expect(response.status).toBe(200)
        
        expect(response.body.turnosConCobertura).toBeDefined();
        expect(response.body.turnosConCobertura[0].cobertura).toBe("TOTAL");
        expect(response.body.turnosConCobertura[0].costo).toBe(0);
    })
})
    //fallas
}) 