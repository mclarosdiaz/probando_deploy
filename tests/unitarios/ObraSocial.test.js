import { describe, expect, test, beforeEach } from "@jest/globals";
import { ObraSocial } from "../../server/domain/obraSocial.js";
import { Plan } from "../../server/domain/plan.js";
import { CoberturaPractica } from "../../server/domain/coberturaPractica.js";
import { Practica } from "../../server/domain/practica.js";

describe("obraSocial",()=>{
    describe("constructor",()=>{
        let plan
        beforeEach(()=>{
            revision = new Practica("4679","456789","Revisión",30, 5000)
            cobertura = new CoberturaPractica(revision, "TOTAL")
            plan = new Plan("basico", [], [cobertura])
        }
        
        )
        test("debe crear una practica correctamente con datos validos",()=>{
            const obraSocial=new ObraSocial("Osde",[plan])
            
            
        expect(obraSocial).toMatchObject(
            {
                nombre: "Osde", 
                planes: [plan]
            }
        )
        })
    })
})