import mongoose from "mongoose";
import { Sede } from "../../domain/sede.js";

const sedeSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    direccion:{
        type: String,
        required: true
    }
},
{
    collection: 'sedes'
});

sedeSchema.loadClass(Sede);
export const SedeModel = mongoose.model("Sede", sedeSchema);