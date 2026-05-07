import { describe, expect, test, beforeEach } from "@jest/globals";
import { CoberturaEspecialidad } from "../../server/domain/coberturaEspecialidad.js";
import { CoberturaPractica } from "../../server/domain/coberturaPractica.js";
import { NivelCobertura } from "../../server/domain/nivelCobertura.js"
import { Plan } from "../../server/domain/plan.js";
import { Especialidad } from "../../server/domain/especialidad.js";
import { Practica } from "../../server/domain/practica.js";


describe("Plan", () => {
    
    describe("ObtenerCobertura", () => {
        let cobertura
        let plan

        beforeEach(() => {
            traumatologia = new Especialidad(
                "5645",
                "Traumatología",
                60,
                10000
            )
            especialidades = [traumatologia]

            revision = new Practica(
                "4679",
                "456789",
                "Revisión",
                30,
                5000
            )
            practicas = [revision]

            coberturaEspecialidad = new CoberturaEspecialidad(traumatologia, "PARCIAL")
            coberturaPractica = new CoberturaPractica(revision, "TOTAL")
            plan = new Plan("123", "basico", [coberturaEspecialidad], [coberturaPractica])
        })

        test("Comprobar si cubre la practica revision", () =>{
            
            const result = plan.obtenerCoberturaPractica(revision) 
            expect(result).toBe("TOTAL")
        })

        test("Comprobar el metodo obtenerCoberturaEspecialidad", () =>{
            const result = plan.obtenerCoberturaEspecialidad(traumatologia) 
            expect(result).toBe("PARCIAL")
        })

        test("Comprobando que una practica que no tiene cobertura debe avisar que no esta cubierta", () => {
            const ecografia = new Practica(
                    "6598",
                    "456745",
                    "Ecografía",
                    45,
                    10000
                )
            const result = plan.obtenerCoberturaPractica(ecografia)
            expect(result).toBe(NivelCobertura["NO CUBIERTO"])
        })

        test("Comprobando que una especialidad que no tiene cobertura debe avisar que no esta cubierta", () => {
            const oftalmologia = new Especialidad("4568",
                    "Oftalmología",
                    45,
                    75000
                )
            const result = plan.obtenerCoberturaEspecialidad(oftalmologia)

            expect(result).toBe(NivelCobertura["NO CUBIERTO"])
        })
    })

    
})


