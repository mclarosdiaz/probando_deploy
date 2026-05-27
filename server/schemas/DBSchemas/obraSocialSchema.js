import mongoose from "mongoose";

const obraSocialSchema = new mongoose.Schema({
    nombre:{
        type: String, 
        required: true
    },
    planes:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'planes',
        required: true
    }
},
{
    collection: 'obras_sociales'
})

export const ObraSocialModel = mongoose.model('Obra_Social',obraSocialSchema)
