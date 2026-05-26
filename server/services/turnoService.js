import{ Turno } from "../domain/turno.js"
import { Paciente } from "../domain/paciente.js";
import { Medico } from "../domain/medico.js";
import { factoryNotificacion } from "../domain/factoryNotificacion.js";
import { agenda } from "../domain/agenda.js";
import { EstadoTurno } from "../domain/estadoTurno.js";
import { MongoTurnoRepository } from "../repositories/turnoRepository.js";
import { MongoPacienteRepository } from "../repositories/pacienteRepository.js"
import { MongoMedicoRepository } from "../repositories/medicoRepository.js"
import { MongoNotificacionRepository } from "../repositories/notificacionRepository.js";
import { 
    BadRequestError, 
    PacienteNotFoundError,
    NotAllowedError, 
    TurnoNotFoundError, 
    MedicoNotFoundError, 
    ConflictError, 
    UnprocessableEntityError
} from "../errors/appError.js";

export class TurnoService{
    constructor(turnoRepository, pacienteRepository, medicoRepository, notificacionRepository){
        this.turnoRepository = turnoRepository
        this.pacienteRepository = pacienteRepository
        this.medicoRepository = medicoRepository
        this.notificacionRepository = notificacionRepository
    }

    async reservar({id, pacienteId}){
        const turno = await this.findById(id)
        const paciente = await this.obtenerPacientePorId(pacienteId)
        
        const turnoModificado = turno.asignarPaciente(paciente)

        const notificacion = factoryNotificacion.crearSegunEstadoTurno(turnoModificado)

        return await Promise.all(
            this.turnoRepository.save(turnoModificado),
            this.notificacionRepository.save(notificacion)
        ) 
    }

    async cancelar({id, motivo, idUsuario}){
        const turno = await this.findById(id)
        let usuario = null
        const ahora = new Date()

        usuario = turno.obtenerUsuario(idUsuario)

        if(!usuario){
            throw new NotAllowedError("El usuario no puede cancelar este turno")
        }
        if(!turno.sePuedeCancelar(ahora)){
            throw new NotAllowedError("No se puede cancelar turnos con menos de 1 hora de anticipacion")
        }

        const turnoModificado = turno.actualizarEstado(
            EstadoTurno.CANCELADO, 
            usuario, 
            motivo)

        return await this.turnoRepository.save(turnoModificado)
    }

    async confirmar({id,idUsuario})
    {
        const turno = await this.findById(id)
        let usuario = null
        const motivo="El turno fue confirmado"

        usuario=turno.obtenerUsuario(idUsuario)
        
        if(!usuario && !(turno.remitenteUltimoCambioEstado().id === idUsuario)){
            throw new NotAllowedError("El usuario no puede confirmar este turno")
        }
        const turnoModificado= turno.actualizarEstado(
            EstadoTurno.CONFIRMADO,
            usuario,
            motivo
        )
        return await this.turnoRepository.save(turnoModificado)
    }

    async obtenerHistorial({ filtros, paginacion}){
        
        const { data, total } = await this.turnoRepository.findAll({
            filtros, 
            paginacion
        })

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
        const turno = await this.turnoRepository.findById(id)
        let usuario = turno.obtenerUsuarioMedico()


        if(usuario.id !== idUsuario){
            throw new NotAllowedError("El usuario no puede marcar como realizado este turno")
        }

        const turnoModificado = turno.actualizarEstado(
            EstadoTurno.REALIZADO, 
            usuario, 
            "Turno realizado")

        return await this.turnoRepository.save(turnoModificado)
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
        const medicos = await this.medicoRepository.findAll()
        let todosLosNuevosTurnos = []

        for (const medico of medicos) {
            const turnosDelMedico = this.generarTurnosParaMedico(medico);
            todosLosNuevosTurnos = todosLosNuevosTurnos.concat(turnosDelMedico);
        }

        return await this.turnoRepository.saveAll(todosLosNuevosTurnos)
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
        const medico = await this.obtenerMedicoPorId(idMedico)

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