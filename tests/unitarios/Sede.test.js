import { describe, expect, test, beforeEach } from "@jest/globals";
import { Sede } from "../../server/domain/sede.js";

describe("Sede",()=>{
    describe("constructor",()=>{
        test("debe crear una sede correctamente con datos validos",()=>{
            const sede=new Sede("Chacarita","Libertador 123")
            sede.id = "123"
            expect(sede.id).toBe("123")
            expect(sede.nombre).toBe("Chacarita")
            expect(sede.direccion).toBe("Libertador 123")
        })
    })
})