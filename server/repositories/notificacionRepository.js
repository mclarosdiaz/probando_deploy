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
        return await nuevaNotificacion.save()
    }

    async findById(id){
        const mongoNotificacion = await this.model
            .findById(id)
            .populate("remitente")
            .populate("destinatario")

        if(!mongoNotificacion){
            throw new NotFoundError(`La notificación ${id} no no fue encontrada`)
        }

        return mongoNotificacion
    }

    async update(idNotificacion) {

        const notificacionActualizada = await this.model
            .findByIdAndUpdate(
                idNotificacion,
                {
                    leida: notificacion.leida
                },
                {
                    new: true
                }
            )
            .populate("remitente")
            .populate("destinatario")

        if (!notificacionActualizada) {
            throw new NotFoundError(
                `La notificación ${notificacion.id} no fue encontrada`
            )
        }

        return notificacionActualizada
    }

    async obtenerNotificacionesDestinatario({idDestinatario, leida}){
        const query = {destinatario: idDestinatario}

        if(leida !== undefined){
            query.leida = leida
        }
        
        return await this.model
            .find(query)
            .populate("remitente")
            .populate("destinatario")
    }
}
