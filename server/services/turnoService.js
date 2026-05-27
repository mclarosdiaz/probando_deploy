import{ Turno } from "../domain/turno.js"
import { Paciente } from "../domain/paciente.js";
import { Medico } from "../domain/medico.js";
import { factoryNotificacion } from "../domain/factoryNotificacion.js";
import { agenda } from "../domain/agenda.js";
import { EstadoTurno } from "../domain/estadoTurno.js";
import { 
    BadRequestError, 
    PacienteNotFoundError,
    NotAllowedError, 
    TurnoNotFoundError, 
    MedicoNotFoundError, 
    ConflictError, 
    UnprocessableEntityError
} from "../errors/appError.js";
import { Sede } from "../domain/sede.js";
import { Usuario } from "../domain/usuario.js";
import { ObraSocial } from "../domain/obraSocial.js";
import { Plan } from "../domain/plan.js";
import { domainMapper } from "../middlewares/domainMapper.js";
import { dtoMapper } from "../middlewares/dtoMapper.js";

export class TurnoService{
    constructor(
        turnoRepository, 
        pacienteRepository, 
        medicoRepository, 
        notificacionRepository, 
        sedeRepository,
        usuarioRepository){
        this.turnoRepository = turnoRepository
        this.pacienteRepository = pacienteRepository
        this.medicoRepository = medicoRepository
        this.notificacionRepository = notificacionRepository, 
        this.sedeRepository = sedeRepository
        this.usuarioRepository = usuarioRepository 
    }

    async reservar({id, pacienteId}){
        const mongoTurno = await this.findById(id)
        const turno = domainMapper.mongoTurnoToDomain(mongoTurno)
        
        const mongoPaciente = await this.obtenerPacientePorId(pacienteId)
        const paciente = domainMapper.mongoPacienteToDomain(mongoPaciente)

        turno.asignarPaciente(paciente)

        const notificacion = factoryNotificacion.crearSegunEstadoTurno(turno)

        const [mongoTurnoGuardado, mongoNotificacionGuardada] =
            await Promise.all([
                this.turnoRepository.save(turno),
                this.notificacionRepository.save(notificacion)
        ])

        return {
            turno: dtoMapper.turnoToDTO(
                domainMapper.mongoTurnoToDomain(mongoTurnoGuardado)
            ),
            notificacion: dtoMapper.notificacionToDTO(
                domainMapper.mongoNotificacionToDomain(
                    mongoNotificacionGuardada
                )
            )
        }
    }

    async cancelar({id, motivo, idUsuario}){
        const mongoTurno = await this.findById(id)
        const turno = domainMapper(mongoTurno)

        const ahora = new Date()

        const usuario = turno.obtenerUsuario(idUsuario)

        if(!usuario){
            throw new NotAllowedError("El usuario no puede cancelar este turno")
        }
        if(!turno.sePuedeCancelar(ahora)){
            throw new NotAllowedError("No se puede cancelar turnos con menos de 1 hora de anticipacion")
        }

        turno.actualizarEstado(
            EstadoTurno.CANCELADO, 
            usuario, 
            motivo)
        
        const notificacion = factoryNotificacion.crearSegunEstadoTurno(turno)

        const [mongoTurnoGuardado, mongoNotificacionGuardada] =
            await Promise.all([
                this.turnoRepository.save(turno),
                this.notificacionRepository.save(notificacion)
        ])

        return {
            turno: dtoMapper.turnoToDTO(
                domainMapper.mongoTurnoToDomain(mongoTurnoGuardado)
            ),
            notificacion: dtoMapper.notificacionToDTO(
                domainMapper.mongoNotificacionToDomain(
                    mongoNotificacionGuardada
                )
            )
        }
    }

    async confirmar({id,idUsuario})
    {
        const mongoTurno = await this.findById(id)
        const turno = domainMapper.mongoTurnoToDomain(mongoTurno)

        const motivo="El turno fue confirmado"

        const usuario = turno.obtenerUsuario(idUsuario)
        
        if(!usuario || turno.remitenteUltimoCambioEstado().id !== idUsuario){
            throw new NotAllowedError("El usuario no puede confirmar este turno")
        }

        turno.actualizarEstado(
            EstadoTurno.CONFIRMADO,
            usuario,
            motivo
        )

        const notificacion = factoryNotificacion.crearSegunEstadoTurno(turno)

        const [mongoTurnoGuardado, mongoNotificacionGuardada] =
            await Promise.all([
                this.turnoRepository.save(turno),
                this.notificacionRepository.save(notificacion)
            ])

        return {
            turno: dtoMapper.turnoToDTO(
                domainMapper.mongoTurnoToDomain(mongoTurnoGuardado)
            ),
            notificacion: dtoMapper.notificacionToDTO(
                domainMapper.mongoNotificacionToDomain(
                    mongoNotificacionGuardada
                )
            )
        }
    }

    async obtenerHistorial({ filtros, paginacion}){
        
        const { documents, total } = await this.turnoRepository.findAll({
            filtros, 
            paginacion
        })

        const data = documents.map(
            document => dtoMapper.turnoToDTO(domainMapper.mongoTurnoToDomain(document)))

        const { page, limit } = paginacion

        const totalPages = Math.ceil(total / limit)

        return {
            data,
            paginacion:{
                page,
                totalPages, 
                total
            }
        }

    }

    async marcarComoRealizado({id, idUsuario}){
        const mongoTurno = await this.turnoRepository.findById(id)
        const turno = domainMapper.mongoTurnoToDomain(mongoTurno)

        const usuario = turno.obtenerUsuarioMedico()

        if(usuario.id !== idUsuario){
            throw new NotAllowedError("El usuario no puede marcar como realizado este turno")
        }

        turno.actualizarEstado(
            EstadoTurno.REALIZADO, 
            usuario, 
            "Turno realizado")

        const turnoGuardado = await this.turnoRepository.save(turno)

        return dtoMapper.turnoToDTO(domainMapper.mongoTurnoToDomain(turnoGuardado))

    }
/* metodo que teniamos antes (si funciona el otro hay que borrarlo)
    async generarTurnosDisponibles(){
        const medicos = await this.turnoRepository.obtenerMedicos()
        const disponiblesTotales = []

        medicos.forEach(medico => {

            const servicios = medico.especialidades.concat(medico.practicas)

            const disponibles = servicios.forEach(servicio => {
                agenda.generarTurnosPara(servicio, medico, 1)

                disponiblesTotales.concat(disponibles)
            })
        })

        return this.turnoRepository.saveAll(disponiblesTotales)
    }
*/

    async generarTurnosDisponibles(){
        const mongoMedico = await this.medicoRepository.findAll()
        const medico = domainMapper.mongoMedicoToDomain(mongoMedico)

        let todosLosNuevosTurnos = []

        for (const medico of medicos) {
            const turnosDelMedico = this.generarTurnosParaMedico(medico);
            todosLosNuevosTurnos = todosLosNuevosTurnos.concat(turnosDelMedico);
        }

        const turnosGuardados = this.turnoRepository.saveAll(todosLosNuevosTurnos)
        
        return turnosGuardados.map(turnoGuardado => dtoMapper.turnoToDTO(domainMapper.mongoTurnoToDomain(turnoGuardado)))

    }

    async generarTurnosParaMedico(medico) {
        const servicios = [...medico.especialidades, ...medico.practicas]
        let turnosDelMedico = []

        servicios.forEach(servicio => {
            const nuevosTurnos = agenda.generarTurnosPara(servicio, medico, 1)
            turnosDelMedico = turnosDelMedico.concat(nuevosTurnos)
        })
        return turnosDelMedico
    }

    async sincronizarTurnosDisponibles(idMedico, nuevaDisponibilidades){
        const ahora = new Date()

        const mongoMedico = await this.obtenerMedicoPorId(idMedico) 
        const medico = domainMapper.mongoMedicoToDomain(mongoMedico) 

        await this.turnoRepository.eliminarDisponiblesFuturos(idMedico, ahora) //TODO falta el metodo en el repositorio
        const nuevosTurnos = this.generarTurnosParaMedico(medico)

        return await this.turnoRepository.saveAll(nuevosTurnos)
    }

    async modificarFechaTurno({ id, idUsuario , fecha }){
        const turno = await this.turnoRepository.findById(id)


        this.validarTurno(turno)

        if(!turno.puedeModificar(idUsuario)){
            throw new NotAllowedError("El usuario no puede solicitar cambio de fecha de este turno")
        }

        await this.validarDisponibilidad(turno, fecha)

        const usuario = turno.obtenerUsuario(idUsuario)  
        
        turno.solicitarCambioFecha(
            fecha, 
            usuario, 
            "El usuario solicitó el cambio de fecha"
        )

        return this.turnoRepository.save(turno)
    }

    async validarDisponibilidad(){
        //TODO
    }

    

    async findById(id){
        const turno = await this.turnoRepository.findById(id)

        this.validarTurno(turno)

        return turno
    }

    async obtenerPacientePorId(id){
        const paciente = await this.pacienteRepository.findById(id)

        this.validarPaciente(paciente)

        return paciente
    }

    async obtenerMedicoPorId(id){
        const medico = await this.medicoRepository.findById(id)

        this.validarMedico(medico)

        return medico
    }

    async obtenerMedicos(){
        const medicos = await this.medicoRepository.findAll()

        if(medicos.length === 0){
            throw new MedicoNotFoundError("No hay médicos disponibles")
        }

        return medicos
    }

    validarTurno(turno){
        if (!turno) {
            throw new TurnoNotFoundError("Turno no encontrado")
        }
    }

    validarMedico(medico){
        if (!medico) {
            throw new MedicoNotFoundError("Médico no encontrado")
        }
    }

    validarPaciente(paciente){
        if(!paciente){
            throw new PacienteNotFoundError("Paciente no encontrado")
        }
    }
}