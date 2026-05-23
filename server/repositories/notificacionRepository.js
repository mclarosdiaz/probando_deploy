import { Notificacion } from "../domain/notificacion.js";
import {
    BadRequestError,
    TurnoNotFoundError,
    UnprocessableEntityError
} from "../errors/appError.js"
import { NotificacionModel } from "../schemas/DBSchemas/notificacionSchema.js";

export class MongoNotifiacionRepository{
    constructor(){
        this.model = NotificacionModel
    }

    async save(notificacion){
        const nuevaNotifiacion = new this.model(notificacion)
        return await nuevaNotifiacion.save()
    }

    async findById(id){
        return await this.model.findById(id)
    }

    async obtenerTodasLasNotificaciones(id){
        return await this.model.find({destinatario : id})
    }
}
