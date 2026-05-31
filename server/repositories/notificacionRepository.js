import { Notificacion } from "../domain/notificacion.js";
import {
    BadRequestError,
    NotFoundError,
    TurnoNotFoundError,
    UnprocessableEntityError
} from "../errors/appError.js"
import { NotificacionModel } from "../schemas/DBSchemas/notificacionSchema.js";
import { notificacionMapper } from "../middlewares/mappers/notificacionMapper.js";
export class MongoNotificacionRepository{
    
    constructor(){
        this.model = NotificacionModel
    }

    async save(notificacion){
        const nuevaNotificacion = new this.model(notificacion)
        const notificacionGuardada = await nuevaNotificacion.save()
        return await notificacionMapper.mongoNotificacionToDomain(notificacionGuardada)
    }

    async findById(id){
        const mongoNotificacion = await this.model
            .findById(id)

        if(!mongoNotificacion){
            throw new NotFoundError(`La notificación ${id} no fue encontrada`)
        }

        return await notificacionMapper.mongoNotificacionToDomain(mongoNotificacion)
    }

    async update(idNotificacion) {

        const notificacionActualizada = await this.model
            .findByIdAndUpdate(
                idNotificacion,
                {
                    leida: true
                },
                {
                    new: true
                }
            )

        if (!notificacionActualizada) {
            throw new NotFoundError(
                `La notificación ${idNotificacion} no fue encontrada`
            )
        }

        return await notificacionMapper.mongoNotificacionToDomain(notificacionActualizada)
    }

    async obtenerNotificacionesDestinatario({idDestinatario, leida}){
        const query = {destinatario: idDestinatario}

        if(leida !== undefined){
            query.leida = leida
        }
        
        return await Promise.all(
        notificaciones.map(n => notificacionMapper.mongoNotificacionToDomain(n))
    )
    }
}
