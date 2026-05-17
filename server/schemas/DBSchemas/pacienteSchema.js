import mongoose from "mongoose";
import { Paciente } from "../../domain/paciente.js";
import { UsuarioModel } from "./usuarioSchema.js";

const pacienteSchema = new mongoose.Schema({
    id: {
        type:String,
        required:true,
        trim:true
    },
    usuario: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario",
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
        ref:"ObraSocial",
        required:true
    },
    plan:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Plan",
        required:true
    },
    eliminado:{
        type: Boolean,
        default: false
    }
})

pacienteSchema.loadClass(Paciente)

export const PacienteModel = mongoose.model('Paciente',pacienteSchema)