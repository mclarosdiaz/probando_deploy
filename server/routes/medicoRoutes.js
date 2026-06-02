import { Router } from 'express'
import { MedicoController } from '../controllers/medicoController.js'
import { MedicoService } from "../services/medicoService.js"
import { MongoMedicoRepository } from '../repositories/medicoRepository.js'
import { MongoTurnoRepository } from '../repositories/turnoRepository.js'
import { validate} from '../middlewares/validate.js'
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
    "/:id/disponibilidades",
    validate(consultarDisponibilidadSchema),
    controller.consultarDisponibilidades
)


router.patch(
    "/:id/disponibilidades",
    validate(modificarDisponibilidadSchema),
    controller.modificarDisponibilidades
)

router.post(
    "/:id/servicios",
    validate(agregarServicioSchema),
    controller.agregarServicio
)

router.delete(
    "/:id/servicios/:tipo/:idServicio",
    validate(eliminarServicioSchema),
    controller.eliminarServicio
)

router.put(
    "/:id/servicios/:tipo/:idServicio",
    validate(modificarServicioSchema),
    controller.modificarServicio
)

export default router
