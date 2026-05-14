import mongoose from "mongoose";
import { Usuario } from "../../domain/usuario.js";

const usuarioEmbeddedSchema = new mongoose.Schema({
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
});

usuarioEmbeddedSchema.loadClass(Usuario);
export const usuarioModel = mongoose.model("Usuario", usuarioEmbeddedSchema);
