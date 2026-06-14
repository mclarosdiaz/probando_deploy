import { beforeEach, describe, expect, test} from "@jest/globals";
import { buildTestApp } from "../utils/buildApp";
import request from "supertest"


describe("Test de endpoint HEALTH", () => {
    let app
    beforeEach(async () => {
        app = buildTestApp()
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