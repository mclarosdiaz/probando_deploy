import { Turno } from "../domain/turno.js";
import { Usuario } from "../domain/usuario.js";
import { Notificacion } from "../domain/notificacion.js";
import { MongoTurnoRepository } from "../repositories/turnoRepository.js";
import { MongoPacienteRepository } from "../repositories/pacienteRepository.js"
import { MongoMedicoRepository } from "../repositories/medicoRepository.js"
import { 
    BadRequestError, 
    PacienteNotFoundError,
    NotAllowedError, 
    TurnoNotFoundError, 
    MedicoNotFoundError, 
    ConflictError, 
    UnprocessableEntityError
} from "../errors/appError.js";
import { domainMapper } from "../middlewares/domainMapper.js";
import { dtoMapper } from "../middlewares/dtoMapper.js";

export class NotificacionService{
    constructor( notificacionRepository){
        this.notificacionRepository = notificacionRepository
    }
    async mostrarNoLeidas({idUsuario}){
        
        const mongoNotifaciones = await this.notificacionRepository.obtenerTodasLasNotificaciones(idUsuario)
        const notifiaciones = domainMapper.mongoNotifacionesToDomain(mongoNotifaciones)
        return notificaciones.filter(notificacion=> !notificacion.leida)
    }
    async mostrarLeidas({idUsuario}){
        const mongoNotifaciones = await this.notificacionRepository.obtenerTodasLasNotificaciones(idUsuario)
        const notifiaciones = domainMapper.mongoNotifacionesToDomain(mongoNotifaciones)
        
        return notificaciones.filter(notificacion=> notificacion.leida)
    }

    async marcarComoLeida({idNotificacion}){
        const mongoNotificacion = await this.notificacionRepository.findById(idNotificacion)
        const notificacion = domainMapper.mongoNotificacionToDomain(mongoNotificacion)

        notificacion.marcarComoLeida()

        return notificacion
    }
    

}