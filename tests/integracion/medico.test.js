import request from "supertest"
import { describe, expect, jest, test, beforeEach } from "@jest/globals"
import { buildTestApp } from "../utils/buildApp.js"
//import{ Turno } from "../server/domain/turno.js"
import { Paciente } from "../../server/domain/paciente.js"
import { Medico } from "../../server/domain/medico.js"
import { Sede } from "../../server/domain/sede.js"
import { date } from "zod"
import { EstadoTurno } from "../../server/domain/estadoTurno.js"
import { Usuario } from "../../server/domain/usuario.js"
import { Practica } from "../../server/domain/practica.js"
import { ObraSocial } from "../../server/domain/obraSocial.js"
import { Especialidad } from "../../server/domain/especialidad.js"
import { DisponibilidadHoraria } from "../../server/domain/disponibilidadHoraria.js"
import { DiaSemana } from "../../server/domain/diaSemana.js"
import { MongoMedicoRepository } from "../../server/repositories/medicoRepository.js"

describe("Medico API- Integracion",()=>{
    let app
    let medicoRepository
    let fechaHora
    let medico
    let paciente
    let rvision
    let sedeChacarita
    let usuarioMedico
    let usuarioPaciente
    let practicas
    let especialidades
    let sedes
    let disponibilidades
    let sedeItaliano
    let oftalmologia
    

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
            )
        ]
        
        oftalmologia=new Especialidad("4568",
                "Oftalmología",
                45,
                75000
            )

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
        medicoRepository = {
            save: jest.fn().mockImplementation(async(entidad) => entidad),
            findById: jest.fn().mockResolvedValue(medico),
            findAll: jest.fn().mockResolvedValue([medico])
        }

        app=buildTestApp(medicoRepository)
        

})

       
describe("POST /medicos/:id/agregarServicio", () => {
    test("Debería retornar 200 agregando un servicio al medico", async () => {
        const response = await request(app)
            .post("/medicos/1234/agregarServicio")
            .send({
                id : "4568",
                nombre : "Oftalmología",
                duracionTurnoEnMins : 45,
                costo : 75000
                })
        console.log(response.status, response.body, response.error)
        expect(response.status).toBe(200)
    })
})

describe("DELETE /medicos/:id/eliminarServicio", () => {
    test("Debería retornar 200 eliminando un servicio", async () => {
        const response = await request(app)
            .delete("/medicos/1234/eliminarServicio")
            .query({ idUsuario: "1234" })
            .send({ idServicio: "6598" })

        expect(response.status).toBe(200)
    })
})

describe("PATCH /medicos/:id/modificarServicio", () => {
    test("Debería retornar 200 modificando un servicio", async () => {
        const response = await request(app)
            .patch("/medicos/123/modificarServicio")
            .query({ idUsuario: "456" })
            .send({
                idServicio: "5645",
                nombre: "Nuevo nombre"
            })

        expect(response.status).toBe(200)
    })
})
})