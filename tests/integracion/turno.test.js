
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
import { seedTestData } from "../../scripts/seedTestData.js"
import { MongoTurnoRepository } from "../../server/repositories/turnoRepository.js"
import { MongoMedicoRepository } from "../../server/repositories/medicoRepository.js"
import { MongoPacienteRepository } from "../../server/repositories/pacienteRepository.js"

import request from "supertest"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

//import { ObraSocial } from "../../server/domain/obraSocial.js"

describe("Turno API- Integracion",()=>{
    
    
    let app
    const turnoRepository = new MongoTurnoRepository()
    const pacienteRepository = new MongoPacienteRepository()
    const medicoRepository = new MongoMedicoRepository()

    const medicoId = new mongoose.Types.ObjectId("507f1f77bcf86cd799439011")
    const turnoId = new mongoose.Types.ObjectId("507f1f77bcf86cd799439012")
    const pacienteId = new mongoose.Types.ObjectId("507f1f77bcf86cd799439013")
    const idUsuarioMedico = new mongoose.Types.ObjectId("507f1f77bcf86cd799439014")
    const idUsuarioPaciente = new mongoose.Types.ObjectId("507f1f77bcf86cd799439015")
    

    beforeAll(async() =>{
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
    beforeEach(async ()=>{
        
        app = buildTestApp({ turnoRepository, pacienteRepository, medicoRepository })
        
        await seedTestData()
        
    })
        
    afterAll(async () => {
       // await mongoose.disconnect()
    })

    describe("GET /turnos/", () => {

         test("debería aceptar una query válida", async () =>{
            const response = await request(app)
                .get("/turnos")
                .query({
                    pacienteId: pacienteId.toString(),
                    estado: "CONFIRMADO", 
                    fechaDesde: "2026-05-01T00:00:00.000Z",
                    page: 1, 
                    limit: 10
                })

           //  console.log(response.body)
            expect(response.status).toBe(200)
        })

        test("debería fallar si estado no pertenece al enum", async() =>{
            const response = await request(app)
                .get("/turnos")
                .query({
                    pacienteId: "032616",
                    estado: "PENDIENTE"
                })

                //console.log(response.body)

                expect(response.status).toBe(400)
        })


        test("debe retornar el historial de turnos", async() => {
            
            const response = await request(app)
                .get("/turnos")
                .query({
                    pacienteId: pacienteId.toString(),
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



describe("PATCH /turnos/:id/reservar", () =>{
    test(`debería reservar un turno correctamente`, async () =>{
        const response = await request(app)
            .patch(`/turnos/${turnoId}/reservar`)
            .send({
                pacienteId: pacienteId.toString()
            })
       // console.log(response.body)

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
            .patch(`/turnos/${turnoId}/cancelar`)
            .send({
                motivo: "No puedo asistir",
                idUsuario: idUsuarioPaciente.toString()
        })
        //console.log(response.body)

        expect(response.status).toBe(200)
    })
})

describe ("POST /turnos/generarTurnosDisponibles",()=>{
    test("deberia retornar 200 con los turnos generados",async()=>{
        const response = await request(app)
        .post("/turnos/generarTurnosDisponibles")
        
       // console.log(response.body)
        expect(response.status).toBe(200)
    })
})


describe ("PATCH /turnos/:id/modificarFecha",()=>{
    test("deberia modificar la fecha de un query valida",async()=>{
        const response = await request(app)
        .patch(`/turnos/${turnoId}/modificarFecha`)
        .send({
            idUsuario: idUsuarioPaciente.toString(),
            nuevaFecha: "2026-06-01T10:00:00.000Z"
        })

        expect(response.status).toBe(200)
    })
})

describe("PATCH /turnos/:id/realizado",()=>{
    test("deberia marcar como realizada una query valida",async()=>{
        const response = await request(app)
        .patch(`/turnos/${turnoId}/realizado`)
        .send({
            idUsuario: idUsuarioMedico.toString()
        })


        expect(response.status).toBe(200)
    })
})

describe("GET /turnos/:idPaciente/turnosDisponibles", () => {
    test("debería retornar los turnos con la cobertura calculada correctamente", async()=>{
        const response = await request(app)
            .get(`/turnos/${pacienteId}/turnosDisponibles`)
            .query({ page: 1, limit:10 })
            .send({
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
