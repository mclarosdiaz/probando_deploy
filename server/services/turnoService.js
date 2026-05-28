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

    async marcarComoRealizado({id, idUsuario}) {
        const mongoTurno = await this.findById(id)
        const turno = domainMapper.mongoTurnoToDomain(mongoTurno)

        const usuario = turno.obtenerUsuarioMedico()

        if (usuario.id !== idUsuario) {
            throw new NotAllowedError("El usuario no puede marcar como realizado este turno")
        }

        turno.actualizarEstado(
            EstadoTurno.REALIZADO,
            usuario,
            "Turno realizado"
        )

        await this.turnoRepository.save(turno)

        const updatedMongo = await this.findById(id)

        return dtoMapper.turnoToDTO(updatedMongo) // 👈 SIN reconvertir a domain otra vez
    }

    async generarTurnosDisponibles() {

        // 1. Traer médicos
        const mongoMedicos = await this.medicoRepository.findAll()

        if (!Array.isArray(mongoMedicos)) {
            throw new Error("medicoRepository.findAll debe devolver un array")
        }

        // 2. Mapear a dominio
        const medicos = mongoMedicos.map(m =>
            domainMapper.mongoMedicoToDomain(m)
        )

        // 3. Generar turnos (sin mutación rara)
        const todosLosNuevosTurnos = medicos.flatMap(medico =>
            this.generarTurnosParaMedico(medico)
        )

        // 4. Guardar
        const turnosGuardados = await this.turnoRepository.saveAll(todosLosNuevosTurnos)

        // 5. DTO final
        return turnosGuardados.map(turno =>
            dtoMapper.turnoToDTO(
                domainMapper.mongoTurnoToDomain(turno)
            )
        )
    }

   async generarTurnosParaMedico(medico) {

        if (!medico) {
            throw new Error("medico undefined en generarTurnosParaMedico")
        }

        const especialidades = medico.especialidades ?? []
        const practicas = medico.practicas ?? []

        const servicios = [...especialidades, ...practicas]

        let turnosDelMedico = []

        for (const servicio of servicios) {

            if (!servicio) continue

            const nuevosTurnos = agenda.generarTurnosPara(servicio, medico, 1)

            if (!Array.isArray(nuevosTurnos)) {
                throw new Error("agenda.generarTurnosPara debe devolver array")
            }

            turnosDelMedico = turnosDelMedico.concat(nuevosTurnos)
        }

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

        const freshMongoTurno = await this.turnoRepository.findById(id)

        return {
            turno: dtoMapper.turnoToDTO(freshMongoTurno),
            notificacion: dtoMapper.notificacionToDTO(
                domainMapper.mongoNotificacionToDomain(mongoNotificacionGuardada)
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