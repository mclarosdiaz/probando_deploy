import mongoose from "mongoose";
import { Paciente } from "../../domain/paciente.js";
import { UsuarioModel } from "./usuarioSchema.js";

const pacienteSchema = new mongoose.Schema({
    usuario: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"usuarios",
        required: true
    },
    dni:{
        type:String,
        required:true,
    },
    nombre:{
        type:String,
        required:true
    },
    obraSocial:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"obras_sociales",
        required:true
    },
    plan:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"planes",
        required:true
    },
    eliminado:{
        type: Boolean,
        default: false
    }
},
{
    collection: "pacientes"
})

pacienteSchema.loadClass(Paciente)

export const PacienteModel = mongoose.model('Paciente',pacienteSchema)