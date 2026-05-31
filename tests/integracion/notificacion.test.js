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

import request from "supertest"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

describe("Notificacion API- Integracion",()=>{
    let app
    
    const notificacionRepository = new MongoNotificacionRepository()
    const idUsuarioPaciente = new mongoose.Types.ObjectId("507f1f77bcf86cd799439015")
    const notificacionId = new mongoose.Types.ObjectId("507f1f77bcf86cd799439016")
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
        
        app = buildTestApp({ notificacionRepository })
        
        await seedTestData()
        
    })
    afterAll(async ()=>{
        await mongoose.disconnect()
    })

    describe(`GET /usuarios/${idUsuarioPaciente}/notificaciones`,()=>{
        test("Deberia retornar 200 mostrando las no leidas",async()=>{
            const response = await request(app)
            .get(`/usuarios/${idUsuarioPaciente}/mostrarNoLeidas`)
            .send(
                leida = "false"
            )
            
            expect(response.status).toBe(200)
            expect(response.body.every(n => n.leida === false)).toBe(true)
        })
    })
    describe(`GET /usuarios/${idUsuarioPaciente}/notificaciones`,()=>{
        test("Deberia retornar 200 mostrando las leidas",async()=>{
            const response = await request(app)
            .get(`/usuarios/${idUsuarioPaciente}/mostrarLeidas`)
            .send(
                leida="true"
            )
            expect(response.status).toBe(200)
            expect(response.body.every(n => n.leida === true)).toBe(true)
        })
    })
    describe("PATCH /usuarios/:idUsuario/:idNotificacion",()=>{
        test("Deberia retornar 200 marcando como leida una notificacion",async()=>{
            const response = await request(app)
            .patch(`/usuarios/${idUsuarioPaciente}/${notificacionId}`)
            expect(response.status).toBe(200)
        })
    })

})