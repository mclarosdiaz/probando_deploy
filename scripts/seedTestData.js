// scripts/seedTestData.js

import mongoose from "mongoose"
import dotenv from "dotenv"

import { UsuarioModel } from "../server/schemas/DBSchemas/usuarioSchema.js"
import { MedicoModel } from "../server/schemas/DBSchemas/medicoSchema.js"
import { PacienteModel } from "../server/schemas/DBSchemas/pacienteSchema.js"
import { SedeModel } from "../server/schemas/DBSchemas/sedeSchema.js"
import { TurnoModel } from "../server/schemas/DBSchemas/turnoSchema.js"
import { practicaEmbeddedSchema } from "../server/schemas/DBSchemas/practicaEmbeddedSchema.js"
import { especialidadEmbeddedSchema } from "../server/schemas/DBSchemas/especialidadEmbeddedSchema.js"
import { PlanModel } from "../server/schemas/DBSchemas/planSchema.js"
import { ObraSocialModel } from "../server/schemas/DBSchemas/obraSocialSchema.js"

dotenv.config()

async function seed() {
    await mongoose.connect(process.env.MONGODB_URI)

    console.log("Conectado")

    // limpiar
    await Promise.all([
        UsuarioModel.deleteMany({}),
        MedicoModel.deleteMany({}),
        PacienteModel.deleteMany({}),
        SedeModel.deleteMany({}),
        TurnoModel.deleteMany({})
    ])

    // usuarios
    const usuarioMedico = await UsuarioModel.create({
        nombre: "Gregory_House",
        password: "1234"
    })

    const usuarioPaciente = await UsuarioModel.create({
        nombre: "Juan_Perez",
        password: "1234",
    })

    // sede
    const sede = await SedeModel.create({
        nombre: "Sede Central",
        direccion: "Av Siempre Viva 123"
    })


    // medico
const medico = await MedicoModel.create({
    usuario: usuarioMedico._id,

    matricula: "MN-45821",

    nombre: "Gregory House",

    especialidades: [
        {
            nombre: "Clínica Médica",
            duracionTurnoEnMins: 30,
            costo: 15000
        },
        {
            nombre: "Diagnóstico",
            duracionTurnoEnMins: 60,
            costo: 25000
        }
    ],

    practicas: [
        {
            codigo: "ECG001",
            nombre: "Electrocardiograma",
            duracionTurnoEnMins: 20,
            costo: 12000
        },
        {
            codigo: "LAB101",
            nombre: "Análisis de Sangre",
            duracionTurnoEnMins: 15,
            costo: 8000
        }
    ],

    sede: [sede._id],

    disponibilidades: [
        {
            diaSemana: "LUNES",
            horaDesde: "08:00",
            horaHasta: "12:00"
        },
        {
            diaSemana: "MIERCOLES",
            horaDesde: "14:00",
            horaHasta: "18:00"
        },
        {
            diaSemana: "VIERNES",
            horaDesde: "09:00",
            horaHasta: "13:00"
        }
    ]
})


    // PLAN

    const plan = await PlanModel.create({
        nombre: "Plan Premium",

        coberturasEspecialidad: [
            {
                especialidad: {
                    nombre: "Clínica Médica",
                    duracionTurnoEnMins: 30,
                    costo: 15000
                },
                nivel: "TOTAL"
            },
            {
                especialidad: {
                    nombre: "Diagnóstico",
                    duracionTurnoEnMins: 60,
                    costo: 25000
                },
                nivel: "PARCIAL"
            }
        ],

        coberturasPractica: [
            {
                practica: {
                    codigo: "ECG001",
                    nombre: "Electrocardiograma",
                    duracionTurnoEnMins: 20,
                    costo: 12000
                },
                nivel: "TOTAL"
            },
            {
                practica: {
                    codigo: "LAB101",
                    nombre: "Análisis de Sangre",
                    duracionTurnoEnMins: 15,
                    costo: 8000
                },
                nivel: "PARCIAL"
            }
        ]
    })


    // OBRA SOCIAL

    const obraSocial = await ObraSocialModel.create({
        nombre: "OSDE",
        planes: [plan._id]
    })


    // PACIENTE

    const paciente = await PacienteModel.create({
        usuario: usuarioPaciente._id,

        dni: "40111222",

        nombre: "Juan Pérez",

        obraSocial: obraSocial._id,

        plan: plan._id
    })

    // turnos
    const turno = await TurnoModel.create({
        medico: medico._id,

        paciente: paciente._id,

        fechaHora: new Date("2026-06-01T10:00:00"),

        sede: sede._id,

        practica: {
            codigo: "ECG001",
            nombre: "Electrocardiograma",
            duracionTurnoEnMins: 20,
            costo: 12000
        },

        estado: "RESERVADO",

        historialEstado: [
            {
                fechaHoraIngreso: new Date("2026-05-20T09:00:00"),
                estado: "DISPONIBLE",
                usuario: usuarioMedico._id,
                motivo: "Creación del turno disponible"
            },
            {
                fechaHoraIngreso: new Date("2026-05-21T14:30:00"),
                estado: "RESERVADO",
                usuario: usuarioPaciente._id,
                motivo: "Reserva realizada por el paciente"
            }
        ],

        costo: 12000
    })

    console.log("Seed completado")

    await mongoose.disconnect()
}

seed().catch(err => {
    console.error(err)
    process.exit(1)
})