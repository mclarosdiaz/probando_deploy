import request from "supertest"
import { describe, expect, jest, test, beforeEach } from "@jest/globals"
import { buildTestApp } from "../utils/buildApp.js"
import { Turno } from "../../server/domain/turno.js"
import { Paciente } from "../../server/domain/paciente.js"
import { Medico } from "../../server/domain/medico.js"
import { Sede } from "../../server/domain/sede.js"
import { EstadoTurno } from "../../server/domain/estadoTurno.js"
import { Usuario } from "../../server/domain/usuario.js"
import { Practica } from "../../server/domain/practica.js"
import { Especialidad } from "../../server/domain/especialidad.js"
import { DiaSemana } from "../../server/domain/diaSemana.js"
import { DisponibilidadHoraria } from "../../server/domain/disponibilidadHoraria.js"
import { Notificacion } from "../../server/domain/notificacion.js"

//import { ObraSocial } from "../../server/domain/obraSocial.js"

describe("Turno API- Integracion",()=>{
    let app
    let turnoRepository
    let medicoRepository
    let pacienteRepository
    let notificacionRepository
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
    let notificacion

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
        
        const turno = new Turno(medico, 
                new Date(Date.now() + 1000 * 60 * 60 * 24), 
                sedeChacarita, 
                EstadoTurno.RESERVADO, 
                revision.costo)
        
        turno.asignarPaciente(paciente)
        turno.actualizarEstado(EstadoTurno.CONFIRMADO, usuarioPaciente, "Turno confirmado")

        turnosMock = [turno]
        
        notificacion = new Notificacion("123",usuarioMedico,usuarioPaciente,"HOLA")

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
            saveAll: jest.fn().mockImplementation(async (entidades) => entidades)
        }

        medicoRepository = {
            save: jest.fn().mockImplementation(async(entidad) => entidad),
            findById: jest.fn().mockResolvedValue(medico),
            findAll: jest.fn().mockResolvedValue([medico])
        }

        pacienteRepository = {
            findById: jest.fn().mockResolvedValue(paciente)
        }
        notificacionRepository =  {
            save: jest.fn().mockImplementation(async(entidad) => entidad),
            findById: jest.fn().mockResolvedValue(notificacion),
            obtenerTodasLasNotificaciones : jest.fn().mockResolvedValue([notificacion])
        }

        app = buildTestApp({notificacionRepository})
    })
    describe("GET /usuarios/:idUsuario/mostrarNoLeidas",()=>{
        test("Deberia retornar 200 mostrando las no leidas",async()=>{
            const response = await request(app)
            .get("/usuarios/1234/mostrarNoLeidas")
            
            expect(response.status).toBe(200)
            expect(response.body.every(n => n.leida === false)).toBe(true)
        })
    })
    describe("GET /usuarios/:idUsuario/mostrarLeidas",()=>{
        test("Deberia retornar 200 mostrando las leidas",async()=>{
            const response = await request(app)
            .get("/usuarios/1234/mostrarLeidas")

            expect(response.status).toBe(200)
            expect(response.body.every(n => n.leida === true)).toBe(true)
        })
    })
    describe("PATCH /usuarios/:idUsuario/:idNotificacion/mostrarNoLeidas",()=>{
        test("Deberia retornar 200 modificando un servicio",async()=>{
            const response = await request(app)
            .patch("/usuarios/1234/123/marcarComoLeida")
            expect(response.status).toBe(200)
        })
    })

})