import { Notificacion } from "../domain/notificacion.js";
import { 
    NotAllowedError, 
    
} from "../errors/appError.js";
import { domainMapper } from "../middlewares/domainMapper.js";
import { dtoMapper } from "../middlewares/dtoMapper.js";

export class NotificacionService{
    constructor( notificacionesRepository){
        this.notificacionesRepository = notificacionesRepository
    }

    async mostrarNotificaciones({ idUsuario, leidas}){
        const mongoNotificaciones = await this.notificacionesRepository.obtenerNotificacionesDestinatario({ idDestinatario: idUsuario, leida: leidas })
        const notificaciones = mongoNotificaciones.map(mongoNotificacion => domainMapper.mongoNotificacionToDomain(mongoNotificacion))

        return notificaciones.map(notificacion => dtoMapper.notificacionToDTO(notificacion)) 
    }


    async marcarComoLeida({idUsuario ,idNotificacion}){
        const mongoNotificacion = await this.notificacionesRepository.findById(idNotificacion)
        const notificacion = domainMapper.mongoNotificacionToDomain(mongoNotificacion)

        if(notificacion.destinatario.id !== idUsuario){
            throw new NotAllowedError("La notificación no pertenece al usuario")
        }

        notificacion.marcarComoLeida()

        const notificacionGuardada = await this.notificacionesRepository
            .update(notificacion.id)

        return dtoMapper.notificacionToDTO(notificacionGuardada)
    }
    

}