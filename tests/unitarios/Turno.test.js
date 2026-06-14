import { describe, expect, test, beforeEach } from "@jest/globals";
import { Medico } from "../../server/domain/medico.js";
import expectCookies from "supertest/lib/cookies";
import { Turno } from "../../server/domain/turno.js";
import { Paciente } from "../../server/domain/paciente.js";
import { Usuario } from "../../server/domain/usuario.js";
import { ObraSocial } from "../../server/domain/obraSocial.js";
import { EstadoTurno } from "../../server/domain/estadoTurno.js";
import { Practica } from "../../server/domain/practica.js";
import { Especialidad } from "../../server/domain/especialidad.js";
import { Sede } from "../../server/domain/sede.js";
import { DisponibilidadHoraria } from "../../server/domain/disponibilidadHoraria.js";
import { DiaSemana } from "../../server/domain/diaSemana.js";
import { date } from "zod";

describe("Turno", () => {
    let usuarioMedico
    let usuarioPaciente
    let revision
    let especialidades
    let practicas
    let sedeChacarita
    let sedeItaliano
    let sedes
    let disponibilidades
    let medico
    let paciente
    let turno
    let fechaHora

    beforeEach(() => {
        fechaHora = new Date()

        usuarioMedico = new Usuario("1234", "Roberto", "1234")
        usuarioPaciente = new Usuario("1234", "pedroGimeenez", "Contraseña")

        revision = new Practica(
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

        sedeChacarita = new Sede("222", "Chacarita jr", "Gutierrez 351")
        sedeItaliano = new Sede("555", "Hospital Italiano", "Alto Pelado, San Luis")

        sedes = [
            new Sede("222", "Chacarita jr", "Gutierrez 351"),
            new Sede("555", "Hospital Italiano", "Alto Pelado, San Luis")
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
        medico = new Medico(
            "1234",
            usuarioMedico,
            "1234",
            "Roberto Gimenez",
            especialidades,
            practicas,
            sedes,
            disponibilidades
        )

        paciente = new Paciente(
            "1234",
            usuarioPaciente,
            "46254978",
            "Pedro Gimenez",

        )
    })


    test("Instanciar un Turno permite setear id, medico, paciente, fechaHora, sede, practica, estado, historialEstados y costo", () => {
        
        turno = new Turno(
            medico,
            fechaHora,
            sedeChacarita,
            EstadoTurno.RESERVADO,
            revision.costo
        )


        expect(turno).toMatchObject(
            {
                medico: medico,
                fechaHora: fechaHora,
                sede: sedeChacarita,
                estado: EstadoTurno.RESERVADO,
                costo: revision.costo
            }
        )
}
    )

    test("Un turno permite asignarle un paciente", () =>{
        
        turno = new Turno(
            medico,
            fechaHora,
            sedeChacarita,
            EstadoTurno.RESERVADO,
            revision.costo
        )

        turno.asignarPaciente(paciente)

        expect(turno).toMatchObject(
            {
                medico: medico,
                paciente: paciente,
                fechaHora: fechaHora,
                sede: sedeChacarita,
                estado: EstadoTurno.RESERVADO,
                costo: revision.costo
            }
        )
    })

    
})