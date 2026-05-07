import { describe, expect, test, beforeEach } from "@jest/globals";
import { agenda } from "../../server/domain/agenda.js";
import { Medico } from "../../server/domain/medico.js";
import { Usuario } from "../../server/domain/usuario.js";
import { Especialidad } from "../../server/domain/especialidad";
import { Practica } from "../../server/domain/practica.js";
import { Sede } from "../../server/domain/sede.js";
import { DisponibilidadHoraria } from "../../server/domain/disponibilidadHoraria.js";
import { DiaSemana } from "../../server/domain/diaSemana.js";
import { Turno } from "../../server/domain/turno.js";

describe("Agenda", () =>{
    describe("generarTurnosPara", () =>{
        let medico
        let usuario
        let revision
        let especialidades
        let practicas
        let sedeChacarita
        let sedeItaliano
        let sedes
        let disponibilidades
        beforeEach(() => {
             usuario = new Usuario("1234", "Roberto", "1234") 
            
             revision =  new Practica(
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
                ),
                new Especialidad("4568",
                    "Oftalmología",
                    45,
                    75000
                )
            ]

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
            
             sedeChacarita = new Sede("222","Chacarita jr","Gutierrez 351")
             sedeItaliano = new Sede("555","Hospital Italiano","Alto Pelado, San Luis") 

            sedes=[
                new Sede("222","Chacarita jr","Gutierrez 351"),
                new Sede("555","Hospital Italiano","Alto Pelado, San Luis")
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
            medico = new Medico("1234", 
                usuario,
                "1234",
                "Roberto Gimenez",
                especialidades,
                practicas,
                sedes,
                disponibilidades  
            )
        })
        
        test("Debe generar 2 turnos para los dias martes de 2 semanas", ()=>{
        
            const turnoMartes1erSem = new Turno(
                medico,
                new Date('2026-05-05T14:00:00'),
                sedeChacarita,
                "DISPONIBLE",
                5000
            )
            const turnoMartes2doSem = new Turno(
                medico,
                new Date('2026-05-12T14:00:00'),
                sedeChacarita,
                "DISPONIBLE",
                5000
            )

            const turnoViernes1erSem = new Turno(
                medico, 
                new Date('2026-05-08T15:00:00'),
                sedeChacarita,
                "DISPONIBLE",
                5000
            )
            const turnoViernes2doSem = new Turno(
                medico, 
                new Date('2026-05-15T15:00:00'),
                sedeChacarita,
                "DISPONIBLE",
                5000
            )
            const turnos = agenda.generarTurnosPara(revision, medico) // IDEA GPT
            
            expect(turnos).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                       medico: medico,
                       sede: sedeChacarita,
                       estado: "DISPONIBLE",
                       costo: 5000 
                    }),
                    expect.objectContaining({
                       medico: medico,
                       sede: sedeChacarita,
                       estado: "DISPONIBLE",
                       costo: 5000 
                    }),
                      expect.objectContaining({
                       medico: medico,
                       sede: sedeChacarita,
                       estado: "DISPONIBLE",
                       costo: 5000 
                    }),
                      expect.objectContaining({
                       medico: medico,
                       sede: sedeChacarita,
                       estado: "DISPONIBLE",
                       costo: 5000 
                    })
                ]),
               
            )
            


            /*
            expect(turnos).toContain(turnoMartes1erSem)
            expect(turnos).toContain(turnoMartes2doSem)
            expect(turnos).toContain(turnoViernes1erSem)
            expect(turnos).toContain(turnoViernes2doSem)
            */
            
        })
    })
})