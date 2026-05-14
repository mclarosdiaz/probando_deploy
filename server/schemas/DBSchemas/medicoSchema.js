import mongoose from "mongoose";
import { Medico } from "../../domain/medico.js"
import { especialidadEmbeddedSchema } from "./especialidadEmbeddedSchema.js";
import { practicaEmbeddedSchema } from "./practicaEmbeddedSchema.js";

const medicoSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        trim: true
    },
    usuario:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Medico",
        required:true
    },
    matricula:{
        type:String,
        required:true,
        trim:true
    },
    nombre:{
        type:String,
        required:true,
        trim:true
    },
    especialidades:{
        type: [especialidadEmbeddedSchema],
        required:true
    },
    practicas:{
        type: [practicaEmbeddedSchema],
        required:true
    },
    sede:{
        type:[mongoose.Schema.Types.ObjectId],
        ref: "Sedes",
        required:true
    },
    disponibilidades:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"DisponibilidadHoraria",
        required:true
    }

})

medicoSchema.loadClass(Medico)
export const MedicoModel = mongoose.model("Medico",medicoSchema)