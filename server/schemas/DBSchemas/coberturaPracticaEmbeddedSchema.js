import mongoose from "mongoose";
import { NivelCobertura } from "../../domain/nivelCobertura.js";
import { CoberturaPractica } from "../../domain/coberturaEspecialidad.js";
import { practicaEmbeddedSchema } from "./practicaidadEmbeddedSchema.js";

export const coberturaPracticaEmbeddedSchema = new mongoose.Schema({
    especialidad:{
        type: practicaEmbeddedSchema,
        required: true
    },
    nivel:{
        type: String,
        enum: Object.values(NivelCobertura),
        required: true,
        trim: true
    },
},
{_id: false});

