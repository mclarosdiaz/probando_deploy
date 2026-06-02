import { Notificacion } from "../../domain/notificacion.js";
import { usuarioMapper } from "./usuarioMapper.js";
import { MongoUsuarioRepository } from "../../repositories/usuarioRepository.js";

class NotificacionMapper{
    constructor(usuarioRepository,usuarioMapper){
        this.usuarioRepository = usuarioRepository
        this.usuarioMapper = usuarioMapper
    }

    async mongoNotificacionToDomain(data){
        const mongoUsuarioDestinatario = await this.usuarioRepository.findById(data.destinatario)
        const usuarioDestinatario = this.usuarioMapper.mongoUsuarioToDomain(mongoUsuarioDestinatario)

        const mongoUsuarioRemitente = await this.usuarioRepository.findById(data.remitente)
        const usuarioRemitente = await this.usuarioMapper.mongoUsuarioToDomain(mongoUsuarioRemitente)

        const mensaje = data.mensaje
        const id=data._id.toString()
        const notificacion= new Notificacion(
            id,
            usuarioDestinatario,
            usuarioRemitente,
            mensaje
        )

        return notificacion
    }

    notificacionToDto(notificacion){
        return{
            id: notificacion.id,
            destinatario : notificacion.destinatario.nombre,
            remitente : notificacion.remitente.nombre,
            mensaje : notificacion.mensaje
        }
    }

}
const usuarioRepository = new MongoUsuarioRepository()

export const notificacionMapper= new NotificacionMapper(usuarioRepository,usuarioMapper)