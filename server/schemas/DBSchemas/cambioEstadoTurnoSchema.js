import mongoose from "mongoose";
import { EstadoTurno } from "../../domain/estadoTurno.js";


export const cambioEstadoTurnoEmbeddedSchema = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    motivo:{
        type: String,
        required: true
    } 

},
{_id: false})
