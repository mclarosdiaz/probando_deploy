import { Router } from 'express'
import { TurnoController } from '../controllers/turnoController.js'
import { TurnoService } from "../services/turnoService.js"
import { validate } from '../middlewares/validate.js'
import { 
    reservarTurnoSchema,
    cancelarTurnoRequestSchema,
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

//TODO Comenzar a usar asyncHandler

router.post(
    "/disponibles/busqueda", 
    validate(busquedaDeTurnosDisponiblesSchema),
    controller.buscarTurnosDisponibles
)
router.post(
    "/disponibilidad",
    validate(generarTurnosDisponiblesSchema),
    controller.generarTurnosDisponibles
)
router.patch(
    "/:id/reservar",
    validate(reservarTurnoSchema),
    controller.reservar
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
    "/:id/modificacionFecha",
    validate(modificarFechaTurnoSchema),
    controller.modificarFechaTurno
)




export default router