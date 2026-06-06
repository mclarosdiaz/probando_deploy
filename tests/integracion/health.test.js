import { beforeEach, describe, expect, test} from "@jest/globals";
import { MongoTurnoRepository } from "../../server/repositories/turnoRepository.js";
import { MongoPacienteRepository } from "../../server/repositories/pacienteRepository.js";
import { MongoMedicoRepository } from "../../server/repositories/medicoRepository.js";
import { buildTestApp } from "../utils/buildApp";
import request from "supertest"



describe("Test de endpoint HEALTH", () => {
    let app
    const turnoRepository = new MongoTurnoRepository()
    const pacienteRepository = new MongoPacienteRepository()
    const medicoRepository = new MongoMedicoRepository()

    beforeEach(async () => {
        app = buildTestApp({ turnoRepository, pacienteRepository, medicoRepository })
    })

    describe("GET /health", () =>{
        test('Debería pasar el Healthcheck', async() =>{
            const response = await request(app)
                .get(`/health`)
                .send({})
                
            expect(response.status).toBe(200)
        })
    })

})