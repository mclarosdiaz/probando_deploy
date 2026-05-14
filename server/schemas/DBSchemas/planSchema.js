import mongoose from "mongoose";
import { coberturaEspecialidadEmbeddedSchema } from "./coberturaEspecialidadEmbeddedSchema.js";
import { Plan } from "../../domain/plan.js";

const planSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    coberturasEspecialidad:{
        type: [coberturaEspecialidadEmbeddedSchema],
        required: true
    },
    coberturasPractica:{
        type: [coberturaPracticaEmbeddedSchema],
        required: true
    }
});

planSchema.loadClass(Plan);
export const planModel = mongoose.model("Plan", planSchema);