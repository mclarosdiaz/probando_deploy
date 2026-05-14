import mongoose from "mongoose";
import { required } from "zod/mini";
import { Especialidad } from "../../domain/especialidad.js";

export const especialidadEmbeddedSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        trim: true
    }, 
    nombre: {
        type: String,
        required: true, 
        trim: true
    }, 
    duracionTurnoEnMins:{
        type: Number,
        required: true
    },
    costo: {
        type: Number, 
        required: true
    }
},
{ _id: false})
