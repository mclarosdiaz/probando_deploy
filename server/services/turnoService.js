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
    UnprocessableEntityError,
    ValidationError
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
        const turno = domainMapper.mongoTurnoToDomain(mongoTurno)

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

    async buscarTurnosDisponibles({idPaciente, filtros, paginacion}) {
        const paciente = await this.pacienteRepository.findById(idPaciente)

        const plan = paciente.plan

        const coberturasPractica = plan.coberturasPractica
        const coberturasEspecialidad = plan.coberturasEspecialidad

        const { documents: turnos, total } = await this.turnoRepository.findAll({filtros, paginacion})
        console.log(turnos[0])
        
        const turnosConCobertura = turnos.map(
            (turno) => {
                const servicio = turno.practica || turno.especialidad
                const cobertura = 
                    plan.obtenerCoberturaPractica(servicio)
                    || plan.obtenerCoberturaEspecialidad(servicio) 
                    let costoFinal = servicio?.costo || 0

                    if (cobertura?.nivel === "TOTAL") {
                        costoFinal = 0
                    } else if (cobertura?.nivel === "PARCIAL") {
                        costoFinal = costoFinal - (costoFinal * (cobertura.porcentaje / 100))
                    }
                return{
                    turno,
                    cobertura: cobertura.nivel,
                    costo: costoFinal
                }
            }
        )

        turnosConCobertura.sort((turnoA, turnoB) => {
            if(turnoA.costo <= turnoB.costo){
                return -1
            }else if(turnoA.costo == turnoB.costo){
                if(turnoA.turno.fechaHora >= turnoB.turno.fechaHora){
                    return -1
                }else{
                    return 1
                }
            }else{
                return 1
            }  
        })

        const {page, limit} = paginacion
        const totalPages = Math.ceil(total / limit)

        return{
            turnosConCobertura,
            page,
            totalPages,
            total
        }
    }

    async marcarComoRealizado({id, idUsuario}){
        const mongoTurno = await this.findById(id)
        const turno = domainMapper.mongoTurnoToDomain(mongoTurno)

        const usuario = turno.obtenerUsuarioMedico()

        if(usuario.id !== idUsuario){
            throw new NotAllowedError("El usuario no puede marcar como realizado este turno")
        }

        turno.actualizarEstado(
            EstadoTurno.REALIZADO, 
            usuario, 
            "Turno realizado")
        console.log(JSON.stringify(mongoTurno.paciente, null, 2))
        const turnoGuardado = await this.turnoRepository.save(turno)
        const freshMongoTurno = await this.findById(id)
        return dtoMapper.turnoToDTO(domainMapper.mongoTurnoToDomain(freshMongoTurno))

    }

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

        medico.disponibilidades = nuevaDisponibilidades

        await this.turnoRepository.eliminarDisponiblesFuturos(idMedico, ahora) 
        
        const nuevosTurnosPosibles = this.generarTurnosParaMedico(medico)
            .filter(nuevoTurno => this.validarDisponibilidad(nuevoTurno, nuevoTurno.fechaHora))

        const turnosGuardados = await this.turnoRepository.saveAll(nuevosTurnosPosibles) 

        return turnosGuardados.map(turnoGuardado => dtoMapper.turnoToDTO(domainMapper.mongoTurnoToDomain(turnoGuardado))) 
            
    }

    async modificarFechaTurno({ id, idUsuario , fecha }){
        const mongoTurno = await this.turnoRepository.findById(id)
        const turno = domainMapper.mongoTurnoToDomain(mongoTurno)

        if(!turno.puedeModificar(idUsuario)){
            throw new NotAllowedError("El usuario no puede solicitar cambio de fecha de este turno")
        }

        const existeConflicto = await this.validarDisponibilidad(turno, fecha)

        if (existeConflicto) {
            throw new ValidationError("El médico no tiene disponibilidad en este horario")
        }

            
        const usuario = turno.obtenerUsuario(idUsuario)  
        
        turno.solicitarCambioFecha(
            fecha, 
            usuario, 
            "El usuario solicitó el cambio de fecha"
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

    async validarDisponibilidad(turno, fecha){
        return await this.turnoRepository.existeTurnoEnFecha({
                idMedico: turno.medico.id,
                fecha,
                excluirTurnoId: turno.id
            })

    }

    
    async findById(id){
        const turno = await this.turnoRepository.findById(id)

        return turno
    }

    async obtenerPacientePorId(id){
        const paciente = await this.pacienteRepository.findById(id)

        return paciente
    }

    async obtenerMedicoPorId(id){
        const medico = await this.medicoRepository.findById(id)

        return medico
    }

    async obtenerMedicos(){
        const medicos = await this.medicoRepository.findAll()

        if(medicos.length === 0){
            throw new MedicoNotFoundError("No hay médicos disponibles")
        }

        return medicos
    }


    
}