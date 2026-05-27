import mongoose, { Mongoose } from "mongoose";
import { DiaSemana } from "../../domain/diaSemana.js";

export const disponibilidadHorariaEmbeddedSchema = new mongoose.Schema({
    diaSemana: {
        type: String,
        enum: Object.values(DiaSemana),
        required: true
    }, 
    horaDesde: {
        type: String,
        required: true,
    }, 
    horaHasta: {
        type: String, 
        required: true
    }
},
{
    _id: false
})