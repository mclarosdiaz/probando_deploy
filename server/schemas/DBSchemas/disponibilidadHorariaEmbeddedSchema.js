import { Mongoose } from "mongoose";
import { DiaSemana } from "../../domain/diaSemana";

export const disponibilidadHorariaEmbeddedSchema = new Mongoose.schema({
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