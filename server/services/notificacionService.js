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

export class NotificacionService{
    constructor(usuarioRepository, notificacionRepository){
        this.usuarioRepository = usuarioRepository
        this.notificacionRepository = notificacionRepository
    }
    async mostrarNoLeidas({idUsuario}){
        const notificaciones = await this.notificacionRepository.obtenerTodasLasNotificaciones(idUsuario)
        let notificacionesNoLeidas= []

        notificacionesNoLeidas = notificaciones.filter(notificacion=> !notificacion.leida)
        return notificacionesNoLeidas
    }
    async mostrarLeidas({idUsuario}){
        const notificaciones = await this.notificacionRepository.obtenerTodasLasNotificaciones(idUsuario)
        let notificacionesLeidas= []

        notificacionesLeidas = notificaciones.filter(notificacion=> notificacion.leida) 
        return notificacionesLeidas
    }
    async marcarComoLeida({idNotificacion}){
        const notificacion = await this.notificacionRepository.findById(idNotificacion)
        const notificacionModificada=notificacion.marcarComoLeida()
        
        return this.notificacionRepository.save(notificacionModificada)
    }
    //TODO obtenerTodasLasNotificaciones deberia devolver
    // toda la lista a partir de un id de usuario

}