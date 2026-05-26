import mongoose from "mongoose";
import { Turno } from "../../domain/turno.js";
import { EstadoTurno } from "../../domain/estadoTurno.js";
import { practicaEmbeddedSchema } from "./practicaEmbeddedSchema.js";
import { especialidadEmbeddedSchema } from "./especialidadEmbeddedSchema.js";
import { reservarTurnoSchema } from "../requestsSchemas/turnoRequestSchemas.js";
import { cambioEstadoTurnoEmbeddedSchema } from "./cambioEstadoTurnoSchema.js";

const turnoSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        trim: true
    },
    medico:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Medico', 
        required: true
    },
    paciente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente', 
        required: true
    }, 
    fechaHora:{
        type: Date,
        required: true
    }, 
    sede:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Sede',
        required: true
    },
    practica:{
        type: practicaEmbeddedSchema, 
        required: false
    }, 
    especialidad:{
        type: especialidadEmbeddedSchema, 
        required: false
    }, 
    estado:{
        type: String,
        enum: Object.values(EstadoTurno),
        required: true, 
        default: EstadoTurno.DISPONIBLE
    },
    historialEstado:[cambioEstadoTurnoEmbeddedSchema],
    
    costo:{
        type: Number,
        required: true
    },
    eliminado: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true,
    collection: 'turnos'
})  

turnoSchema.loadClass(Turno)

export const TurnoModel = mongoose.model('Turno', turnoSchema)