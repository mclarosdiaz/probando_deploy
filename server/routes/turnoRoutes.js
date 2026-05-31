import { Router } from 'express'
import { TurnoController } from '../controllers/turnoController.js'
import { TurnoService } from "../services/turnoService.js"
import { validate, validateQuery } from '../middlewares/validate.js'
import { 
    reservarTurnoSchema,
    cancelarTurnoRequestSchema,
    obtenerHistorialTurnosSchema,
    modificarEstadoTurnoSchema,
    generarTurnosDisponiblesSchema,
    modificarFechaTurnoSchema,
    busquedaDeTurnosDisponiblesSchema
 } from '../schemas/requestsSchemas/turnoRequestSchemas.js'
import { MongoTurnoRepository } from '../repositories/turnoRepository.js'
import { MongoMedicoRepository } from '../repositories/medicoRepository.js'
import { MongoNotificacionRepository } from '../repositories/notificacionRepository.js'
import { MongoSedeRepository } from '../repositories/sedeRepository.js'
import { MongoUsuarioRepository } from '../repositories/usuarioRepository.js'
import { MongoPacienteRepository } from '../repositories/pacienteRepository.js'


const router = Router()

const turnoRepository = new MongoTurnoRepository()
const pacienteRepository = new MongoPacienteRepository()
const medicoRepository = new MongoMedicoRepository()
const notificacionRepository = new MongoNotificacionRepository()
const sedeRepository = new MongoSedeRepository()
const usuarioRepository = new MongoUsuarioRepository()

const turnoService = new TurnoService(turnoRepository, 
    pacienteRepository, 
    medicoRepository, 
    notificacionRepository, 
    sedeRepository, 
    usuarioRepository)
    
const controller = new TurnoController(turnoService)

router.patch(
    "/:id/reservar",
    validate(reservarTurnoSchema),
    controller.reservar
)

router.get(
    "/",
    validate(obtenerHistorialTurnosSchema),
    //TODO mover pacienteId a PATH param
    //mover a rutas de paciente
    controller.obtenerHistorialTurnos
)

router.post(
    "/:id/cancelar",
    validate(cancelarTurnoRequestSchema),
    controller.cancelarTurno
)

router.post(
    "/:id/confirmar",
    validate(modificarEstadoTurnoSchema),
    controller.marcarComoConfirmado
)

router.patch(
    "/:id/realizado",
    validate(modificarEstadoTurnoSchema),
    controller.marcarComoRealizado
)

router.post(
    "/disponibilidad",
    validate(generarTurnosDisponiblesSchema),
    controller.generarTurnosDisponibles
)

router.post(
    "/:id/modificarFecha",
    validate(modificarFechaTurnoSchema),
    controller.modificarFechaTurno
)

//Mover a Body de Request o mover ENDPOINT a gestión de pacientes
router.post(
    "/busqueda", //TEMPORAL
    validate(busquedaDeTurnosDisponiblesSchema),
    controller.buscarTurnosDisponibles
)


export default router