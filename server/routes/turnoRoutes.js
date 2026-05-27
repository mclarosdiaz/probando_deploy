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
    modificarFechaTurnoSchema
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
    controller.obtenerHistorialTurnos
)

router.patch(
    "/:id/cancelar",
    validate(cancelarTurnoRequestSchema),
    controller.cancelarTurno
)

router.patch(
    "/:id/confirmado",
    validate(modificarEstadoTurnoSchema),
    controller.marcarComoConfirmado
)

router.patch(
    "/:id/realizado",
    validate(modificarEstadoTurnoSchema),
    controller.marcarComoRealizado
)

router.post(
    "/generarTurnosDisponibles",
    validate(generarTurnosDisponiblesSchema),
    controller.generarTurnosDisponibles
)

router.patch(
    "/:id/modificarFecha",
    validate(modificarFechaTurnoSchema),
    controller.modificarFechaTurno
)

router.get(
    "/:idPaciente/turnosDisponibles", //TEMPORAL
    validate(busquedaDeTurnosDisponibles),
    controller.buscarTurnosDisponibles
)


export default router