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
    constructor( notificacionesRepository){
        this.notificacionesRepository = notificacionesRepository
    }
    async mostrarNoLeidas({idUsuario}){
        
        const mongoNotificaciones = await this.notificacionesRepository.obtenerNotificacionesDestinatario({idRemitente: idUsuario, leida: false})
        const notificaciones = mongoNotificaciones.map(mongoNotificacion => domainMapper.mongoNotificacionesToDomain(mongoNotificacion)) 
        
        return notificaciones.map(notificacion => dtoMapper.notificacionToDTO(notificacion)) 
    }
    async mostrarLeidas({idUsuario}){
        const mongoNotificaciones = await this.notificacionesRepository.obtenerNotificacionesDestinatario({idDestinatario: idUsuario, leida: true})
        const notificaciones = mongoNotificaciones.map(mongoNotificacion => domainMapper.mongoNotificacionesToDomain(mongoNotificacion)) 
        
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