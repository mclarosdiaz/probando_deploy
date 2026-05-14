import mongoose from "mongoose";

export const practicaEmbeddedSchema = new mongoose.Schema({
        id: String, 
        codigo: String, 
        nombre: String, 
        duracionTurnoEnMins: Number,
        costo: Number
    },
    {_id: false});