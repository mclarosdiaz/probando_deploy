import { Router } from 'express'
import { MedicoController } from '../controllers/medicoController.js'
import { MedicoService } from "../services/medicoService.js"
import { MongoMedicoRepository } from '../repositories/medicoRepository.js'
import { MongoTurnoRepository } from '../repositories/turnoRepository.js'
import { validate, validateQuery } from '../middlewares/validate.js'
import { consultarDisponibilidadSchema, 
        modificarDisponibilidadSchema,
        agregarServicioSchema,
        eliminarServicioSchema,
        modificarServicioSchema
} from '../schemas/requestsSchemas/medicoRequestSchema.js'
import { TurnoService } from '../services/turnoService.js'

const router = Router()

const medicoRepository = new MongoMedicoRepository()
const turnoRepository = new MongoTurnoRepository()

const turnoService = new TurnoService(turnoRepository)

const service = new MedicoService(medicoRepository, turnoService)
const controller = new MedicoController(service)


router.get(
    "/disponibilidades",
    validate(consultarDisponibilidadSchema),
    controller.consultarDisponibilidades
)

//TODO  Es un PUT a DISPONIBILIDADES
router.patch(
    "/:id/modificarDisponibilidad",
    validate(modificarDisponibilidadSchema),
    controller.modificarDisponibilidades
)

//TODO POST /:id/SERVICIOS
router.post(
    "/:id/agregarServicio",
    validate(agregarServicioSchema),
    controller.agregarServicio
)

//TODO DELETE /:id/SERVICIOS/:idServicio
router.delete(
    "/:id/eliminarServicio",
    validate(eliminarServicioSchema),
    controller.eliminarServicio
)

router.patch(
    "/:id/modificarServicio",
    validate(modificarServicioSchema),
    controller.modificarServicio
)

export default router
