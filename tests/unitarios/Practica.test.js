import { describe, expect, test, beforeEach } from "@jest/globals";
import { Practica } from "../../server/domain/practica.js";

describe("practica",()=>{
    describe("constructor",()=>{
        test("debe crear una practica correctamente con datos validos",()=>{
            const practica=new Practica("123","123","Revision",30,50)
            expect(practica.id).toBe("123")
            expect(practica.codigo).toBe("123")
            expect(practica.nombre).toBe("Revision")
            expect(practica.duracionTurnoEnMins).toBe(30)
            expect(practica.costo).toBe(50)
        })
    })
})