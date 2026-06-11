import mongoose from "mongoose";

export const practicaEmbeddedSchema = new mongoose.Schema({ 
        id: {
            type: String,
            required: true
        },
        codigo: {
            type: String,
            required: true
        }, 
        nombre: {
            type: String,
            required: true
        }, 
        duracionTurnoEnMins: {
            type: Number, 
            required: true
        },
        costo:{
            type: Number, 
            required: true
        } 
    },
    {_id: false});