import { describe, expect, test, beforeEach } from "@jest/globals";
import { Paciente } from "../../server/domain/paciente.js";
import { Usuario } from "../../server/domain/usuario.js";
import { CoberturaPractica } from "../../server/domain/coberturaPractica.js";
import { Plan } from "../../server/domain/plan.js";
import { ObraSocial } from "../../server/domain/obraSocial.js";
import { Practica } from "../../server/domain/practica.js";


describe ("Paciente",()=>{
    describe("constructor",()=>{
        let usuario
        let cobertura
        let plan
        let obraSocial
        let revision
        beforeEach(()=>{
            revision = new Practica("4679","456789","Revisión",30,5000)
            usuario = new Usuario("2", "Tomas", "5678")
            cobertura = new CoberturaPractica(revision, "TOTAL")
            plan = new Plan("123", "basico", [], [cobertura])
            obraSocial = new ObraSocial("123", "Osde", [plan])
        })
        test("debe crear un paciente correctamente con datos validos",()=>{
        const paciente = new Paciente(usuario,"40123321","Tomas",obraSocial,plan)

        

       
        expect(paciente.usuario).toBe(usuario)
        expect(paciente.dni).toBe("40123321")
        expect(paciente.nombre).toBe("Tomas")
        expect(paciente.plan).toBe(plan)
        })
    })
})
