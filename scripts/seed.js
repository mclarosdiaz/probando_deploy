import mongoose from 'mongoose';
import { UsuarioModel } from "../server/schemas/DBSchemas/usuarioSchema.js";
import { MedicoModel } from "../server/schemas/DBSchemas/medicoSchema.js";
import { PacienteModel } from "../server/schemas/DBSchemas/pacienteSchema.js";
import { SedeModel } from "../server/schemas/DBSchemas/sedeSchema.js";
import { TurnoModel } from "../server/schemas/DBSchemas/turnoSchema.js";
import { PlanModel } from "../server/schemas/DBSchemas/planSchema.js";
import { ObraSocialModel } from "../server/schemas/DBSchemas/obraSocialSchema.js";
import { NotificacionModel } from "../server/schemas/DBSchemas/notificacionSchema.js";

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/GD1C2026';

async function ejecutarSeed() {
    try {
        console.log('🔄 Conectando a MongoDB en:', MONGO_URI);
        await mongoose.connect(MONGO_URI);

        console.log('🗑️ Vaciando colecciones...');
        await Promise.all([
            UsuarioModel.deleteMany({}),
            MedicoModel.deleteMany({}),
            PacienteModel.deleteMany({}),
            SedeModel.deleteMany({}),
            TurnoModel.deleteMany({}),
            PlanModel.deleteMany({}),
            ObraSocialModel.deleteMany({}),
            NotificacionModel.deleteMany({})
        ]);

        console.log('🌱 Insertando datos maestros...');

        const usuarioMedico = await UsuarioModel.create({
            nombre: "Gregory_House",
            password: "1234"
        });

        const usuarioPaciente = await UsuarioModel.create({
            nombre: "Juan_Perez",
            password: "1234",
        });

        const sede = await SedeModel.create({
            nombre: "Sede Central",
            direccion: "Av Siempre Viva 123"
        });

        const medico = await MedicoModel.create({
            usuario: usuarioMedico._id,
            matricula: "MN-45821",
            nombre: "Gregory House",
            especialidades: [
                { id: "1234", nombre: "Clínica Médica", duracionTurnoEnMins: 30, costo: 15000 },
                { id: "1235", nombre: "Diagnóstico", duracionTurnoEnMins: 60, costo: 25000 }
            ],
            practicas: [
                { id: "1236", codigo: "ECG001", nombre: "Electrocardiograma", duracionTurnoEnMins: 20, costo: 12000 },
                { id: "1237", codigo: "LAB101", nombre: "Análisis de Sangre", duracionTurnoEnMins: 15, costo: 8000 }
            ],
            sede: [sede._id],
            disponibilidades: [
                { diaSemana: "LUNES", horaDesde: "08:00", horaHasta: "12:00" },
                { diaSemana: "MIERCOLES", horaDesde: "14:00", horaHasta: "18:00" },
                { diaSemana: "VIERNES", horaDesde: "09:00", horaHasta: "13:00" }
            ]
        });

        const plan = await PlanModel.create({
            nombre: "Plan Premium",
            coberturasEspecialidad: [
                { especialidad: { id: "1234", nombre: "Clínica Médica" }, nivel: "TOTAL" },
                { especialidad: { id: "1235", nombre: "Diagnóstico" }, nivel: "PARCIAL" }
            ],
            coberturasPractica: [
                { practica: { id: "1236", codigo: "ECG001", nombre: "Electrocardiograma" }, nivel: "TOTAL" },
                { practica: { id: "1237", codigo: "LAB101", nombre: "Análisis de Sangre" }, nivel: "PARCIAL" }
            ]
        });

        const obraSocial = await ObraSocialModel.create({
            nombre: "OSDE",
            planes: [plan._id]
        });

        const PACIENTE_ID = "654321abcdef1234567890ab";
        const paciente = await PacienteModel.create({
            _id: new mongoose.Types.ObjectId(PACIENTE_ID),
            usuario: usuarioPaciente._id,
            dni: "40111222",
            nombre: "Juan Pérez",
            obraSocial: obraSocial._id,
            plan: plan._id
        });

        await TurnoModel.create({
            medico: medico._id,
            fechaHora: new Date("2026-07-15T10:00:00"),
            sede: sede._id,
            servicio: {
                tipo: "PRACTICA",
                practica: { id: "1236", codigo: "ECG001", nombre: "Electrocardiograma", duracionTurnoEnMins: 20, costo: 12000 }
            },
            estado: "DISPONIBLE",
            costo: 12000,
            historialEstados: [{ fechaHoraIngreso: new Date(), estado: "DISPONIBLE", usuario: usuarioMedico._id, motivo: "Inicial" }]
        });

        await TurnoModel.create({
            medico: medico._id,
            fechaHora: new Date("2026-07-16T11:30:00"),
            sede: sede._id,
            servicio: {
                tipo: "ESPECIALIDAD",
                especialidad: { id: "1234", nombre: "Clínica Médica", duracionTurnoEnMins: 30, costo: 15000 }
            },
            estado: "DISPONIBLE",
            costo: 15000,
            historialEstados: [{ fechaHoraIngreso: new Date(), estado: "DISPONIBLE", usuario: usuarioMedico._id, motivo: "Inicial" }]
        });

        console.log('🚀 Base de datos poblada con éxito.');
        console.log(`📌 ID PACIENTE PARA TU FRONTEND: ${PACIENTE_ID}`);

    } catch (error) {
        console.error('❌ Error ejecutando el seed:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Desconectado de MongoDB.');
    }
}

ejecutarSeed();