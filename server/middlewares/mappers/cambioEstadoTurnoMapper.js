import { CambioEstadoTurno } from "../../domain/cambioEstadoTurno.js"
import { MongoTurnoRepository } from "../../repositories/turnoRepository.js"
import { MongoUsuarioRepository } from "../../repositories/usuarioRepository.js"
import { usuarioMapper } from "./usuarioMapper.js"



class CambioEstadoTurnoMapper{
    constructor(turnoRepository, usuarioRepository, usuarioMapper)
    {
        this.turnoRepository = turnoRepository
        this.usuarioRepository = usuarioRepository
        this.usuarioMapper = usuarioMapper
    }
    async mongoCambioEstadoTurnoToDomain(data){
        const usuario = await this.usuarioRepository.findById(data.usuario)
        const turno = await this.turnoRepository.findById(data.turno)
        const cambioEstadoTurno = new CambioEstadoTurno(
            data.fechaHoraIngreso,
            data.estado,
            turno.id,
            usuario,
            data.motivo
        )
        return cambioEstadoTurno
    }
    
    cambioEstadoTurnoToDto(cambio){
        return{
            fechaHoraIngreso : cambio.fechaHoraIngreso,
            estado: cambio.estado,
            turno : cambio.turno.id,
            usuario : cambio.usuario.nombre,
            motivo : cambio.motivo
        }
    }
}
const usuarioRepository = new MongoUsuarioRepository()
const turnoRepository = new MongoTurnoRepository()

export const cambioEstadoTurnoMapper = new CambioEstadoTurnoMapper(turnoRepository,usuarioRepository, usuarioMapper)