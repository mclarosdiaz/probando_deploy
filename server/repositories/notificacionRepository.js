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

    async save(notificacion){
        const nuevaNotificacion = new this.model(notificacion)
        return await nuevaNotificacion.save
    }

    async findById(id){
        const mongoNotificacion = await this.model
            .findById(id)
            .populate("usuarios")

        if(!mongoNotificacion){
            throw new NotFoundError(`La notificación no ${id} no fue encontrada`)
        }

        return mongoNotificacion
    }

    async obtenerTodasLasNotificaciones(id){
        return await this.model.find({destinatario : id})
    }
}
