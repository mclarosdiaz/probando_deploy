import { describe, expect, test, beforeEach } from "@jest/globals";
import { factoryNotificacion } from "../../server/domain/factoryNotificacion.js";
import { estrategiasNotificacion } from "../../server/domain/estrategiasNotificacion.js";
import { Turno } from "../../server/domain/turno.js";
import { Notificacion } from "../../server/domain/notificacion.js";
import { Medico } from "../../server/domain/medico.js";
import { Paciente } from "../../server/domain/paciente.js";
import { ObraSocial } from "../../server/domain/obraSocial.js";
import { Plan } from "../../server/domain/plan.js";
import { CoberturaPractica } from "../../server/domain/coberturaPractica.js";

describe("factoryNotificacion", () =>{
    describe("segunEstadoTurno", () =>{
        let medico
        let usuario
        let revision
        let especialidades
        let practicas
        let sedeChacarita
        let sedeItaliano
        let sedes
        let disponibilidades
        let turno
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
                new DisponibilidadHoraria("VIERNES",
                    "14:30",
                    "17:00"
                ),
                new DisponibilidadHoraria("MARTES",
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
            fechaHora = new Date('2026-05-05T14:00:00')
            sede = sedeChacarita
            costo = 5000

            usuario2 = new Usuario("5678", "Tomas", "5678")
            cobertura = new CoberturaPractica(revision, "TOTAL")
            plan = new Plan("123", "basico", [], [cobertura])
            obraSocial = new ObraSocial("123", "Osde", [plan])

            paciente = new Paciente(
                "5678",
                usuario2,
                "458990",
                "Tomas",
                obraSocial,
                plan
            )
            
            turno=new Turno(medico,fechaHora,sede,"DISPONIBLE",costo)
            turno.asignarPaciente(paciente)
            turno.asignarPractica(revision)
        })

        test()
        
    })
})