import { Notificacion } from "../domain/notificacion.js";
import {
    BadRequestError,
    NotFoundError,
    TurnoNotFoundError,
    UnprocessableEntityError
} from "../errors/appError.js"
import { NotificacionModel } from "../schemas/DBSchemas/notificacionSchema.js";

export class MongoNotificacionRepository{
    constructor(){
        this.model = NotificacionModel
    }

    toDomain(mongoNotificacion){
        const data = mongoNotificacion.toObject()

        const notificacion = new Notificacion(
            data.id,
            data.destinatario,
            data.remitente,
            data.mensaje
        )

        notificacion.fechaHoraCreacion = data.fechaHoraCreacion
        notificacion.leida = data.leida

        if(notificacion.fechaHoraLeida){
            notificacion.fechaHoraLeida = data.fechaHoraLeida
        }

    }

    async save(notificacion){
        const nuevaNotificacion = new this.model(notificacion)
        return await nuevaNotificacion.save
    }

    async findById(id){
        const mongoNotificacion = await this.model.findById(id)

        if(!mongoNotificacion){
            throw new NotFoundError(`La notificación no ${id} no fue encontrada`)
        }

        return this.toDomain(mongoNotificacion)
    }
}
