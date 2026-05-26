import mongoose from "mongoose";
import { Usuario } from "../../domain/usuario.js";

const usuarioSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    }
},
{
    collection: 'usuarios'
});

usuarioSchema.loadClass(Usuario);
export const UsuarioModel = mongoose.model("Usuario", usuarioSchema);
