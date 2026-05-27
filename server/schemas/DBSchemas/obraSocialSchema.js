import mongoose, { Collection, Mongoose } from "mongoose";

export const obraSocialSchema = Mongoose.schema({
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