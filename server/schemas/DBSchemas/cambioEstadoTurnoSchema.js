import mongoose from "mongoose";
import { Schema } from "zod/v3";
import { EstadoTurno } from "../../domain/estadoTurno";
import { usuarioEmbeddedSchema } from "./usuarioEmbeddedSchema";
import { CambioEstadoTurno } from "../../domain/cambioEstadoTurno";

export const cambioEstadoTurnoEmbeddedSchema = new Schema({
    fechaHoraIngreso: {
        type: Date,
        required: true
    },
    estado: {
        type: String,
        enum: Object.values(EstadoTurno),
        required: true, 
    }, 
    usuario:{
        type: usuarioEmbeddedSchema,
        required: true
    },
    motivo:{
        type: String,
        required: true
    } 

},
{_id: false})
