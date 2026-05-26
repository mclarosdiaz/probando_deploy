import mongoose from "mongoose";
import { Notificacion } from "../../domain/notificacion.js";


const notificacionSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        trim: true
    },
    destinatario:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required:true
    },
    remitente: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario",
        required:true
    },
    mensaje:{
        type: String,
        required:true,
    },
    fechaHoraCreacion:{
        type: Date,
        required: true //DUDA
    },
    fechaHoraLeida:{
        type: Date
    },
    leida:{
        type: Boolean,
        default: false
    }

},
{
    timestamps: true,
    collection: 'notificaciones'
})

notificacionSchema.loadClass(Notificacion)

export const NotificacionModel = mongoose.model('Notificacion',notificacionSchema)
