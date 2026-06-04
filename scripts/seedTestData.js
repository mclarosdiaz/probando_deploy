// scripts/seedTestData.js

import mongoose from "mongoose"
import dotenv from "dotenv"

import { UsuarioModel } from "../server/schemas/DBSchemas/usuarioSchema.js"
import { MedicoModel } from "../server/schemas/DBSchemas/medicoSchema.js"
import { PacienteModel } from "../server/schemas/DBSchemas/pacienteSchema.js"
import { SedeModel } from "../server/schemas/DBSchemas/sedeSchema.js"
import { TurnoModel } from "../server/schemas/DBSchemas/turnoSchema.js"
import { PlanModel } from "../server/schemas/DBSchemas/planSchema.js"
import { ObraSocialModel } from "../server/schemas/DBSchemas/obraSocialSchema.js"
import { NotificacionModel } from "../server/schemas/DBSchemas/notificacionSchema.js"
dotenv.config()

export async function seedTestData() {
    
    // limpiar
    await Promise.all([
        UsuarioModel.deleteMany({}),
        MedicoModel.deleteMany({}),
        PacienteModel.deleteMany({}),
        SedeModel.deleteMany({}),
        TurnoModel.deleteMany({}),
        ObraSocialModel.deleteMany({}),
        PlanModel.deleteMany({}),
        NotificacionModel.deleteMany({})
    ])

    // usuarios

    const idUsuarioMedico = new mongoose.Types.ObjectId("507f1f77bcf86cd799439014")
    const idUsuarioPaciente = new mongoose.Types.ObjectId("507f1f77bcf86cd799439015")

    const usuarioMedico = await UsuarioModel.create({
        _id: idUsuarioMedico,
        nombre: "Gregory_House",
        password: "1234"
    })

    const usuarioPaciente = await UsuarioModel.create({
        _id: idUsuarioPaciente,
        nombre: "Juan_Perez",
        password: "1234",
    })

    // sede
    const sede = await SedeModel.create({
        nombre: "Sede Central",
        direccion: "Av Siempre Viva 123"
    })

    // medico
const medicoId = new mongoose.Types.ObjectId("507f1f77bcf86cd799439011")

const medico = await MedicoModel.create({
    _id: medicoId,

    usuario: usuarioMedico._id,

    matricula: "MN-45821",

    nombre: "Gregory House",

    especialidades: [
        {
            id: "1234",
            nombre: "Clínica Médica",
            duracionTurnoEnMins: 30,
            costo: 15000
        },
        {
            id: "1235",
            nombre: "Diagnóstico",
            duracionTurnoEnMins: 60,
            costo: 25000
        }
    ],

    practicas: [
        {
            id: "1236",
            codigo: "ECG001",
            nombre: "Electrocardiograma",
            duracionTurnoEnMins: 20,
            costo: 12000
        },
        {
            id: "1237",
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
                    id : "1234",
                    nombre: "Clínica Médica",
                    duracionTurnoEnMins: 30,
                    costo: 15000
                },
                nivel: "TOTAL"
            },
            {
                especialidad: {
                    id : "1235",
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
                    id : "1236",
                    codigo: "ECG001",
                    nombre: "Electrocardiograma",
                    duracionTurnoEnMins: 20,
                    costo: 12000
                },
                nivel: "TOTAL"
            },
            {
                practica: {
                    id : "1237",
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

    const pacienteId = new mongoose.Types.ObjectId("507f1f77bcf86cd799439013")
    const paciente = await PacienteModel.create({
        _id: pacienteId,
        
        usuario: usuarioPaciente._id,

        dni: "40111222",

        nombre: "Juan Pérez",

        obraSocial: obraSocial._id,

        plan: plan._id
    })

    // turnos
    const turnoId = new mongoose.Types.ObjectId("507f1f77bcf86cd799439012")

    const turno = await TurnoModel.create({
        _id: turnoId,

        medico: medico._id,

        paciente: paciente._id,

        fechaHora: new Date("2026-06-14T10:00:00"),

        sede: sede._id,

        servicio: {
            tipo: "PRACTICA",
            practica:{
                id: "1236",
                codigo: "ECG001",
                nombre: "Electrocardiograma",
                duracionTurnoEnMins: 20,
                costo: 12000
            }
        },

        estado: "RESERVADO",

        historialEstados: [
            {
                fechaHoraIngreso: new Date("2026-05-20T09:00:00"),
                estado: "DISPONIBLE",
                usuario: usuarioMedico._id,
                motivo: "Creación del turno disponible"
            },
            {
                fechaHoraIngreso: new Date("2026-06-10T14:30:00"),
                estado: "RESERVADO",
                usuario: usuarioPaciente._id,
                motivo: "Reserva realizada por el paciente"
            }
        ],

        costo: 12000
    })
    
    const turnoSinReservarId = new mongoose.Types.ObjectId("507f1f77bcf86cd799439021")

    const turnoSinReservar = await TurnoModel.create({
        _id: turnoSinReservarId,

        medico: medico._id,

        fechaHora: new Date("2026-06-10T10:00:00"),

        sede: sede._id,

        servicio:{
            tipo: "PRACTICA",
            practica: {
                id: "1236",
                codigo: "ECG001",
                nombre: "Electrocardiograma",
                duracionTurnoEnMins: 20,
                costo: 12000
            },   
        },

        estado: "DISPONIBLE",

        historialEstados: [
            {
                fechaHoraIngreso: new Date("2026-05-20T09:00:00"),
                estado: "DISPONIBLE",
                usuario: usuarioMedico._id,
                motivo: "Creación del turno disponible"
            }
        ],

        costo: 12000
    })

    //Notificacion
    const notificacionId = new mongoose.Types.ObjectId("507f1f77bcf86cd799439016")

    const notificacion = await NotificacionModel.create({
        _id : notificacionId,
        
        destinatario: idUsuarioPaciente,

        remitente: idUsuarioPaciente,

        mensaje: "HOLA",

        fechaHoraCreacion: new Date(),

        fechaHoraLeida: new Date(),

    })

    
}
