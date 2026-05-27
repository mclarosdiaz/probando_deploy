import mongoose from "mongoose";
import { coberturaEspecialidadEmbeddedSchema } from "./coberturaEspecialidadEmbeddedSchema.js";
import { coberturaPracticaEmbeddedSchema } from "./coberturaPracticaEmbeddedSchema.js";
import { Plan } from "../../domain/plan.js";

const planSchema = new mongoose.Schema({
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
},
{
    collection: 'planes'
}
);

planSchema.loadClass(Plan);
export const planModel = mongoose.model("Plan", planSchema);