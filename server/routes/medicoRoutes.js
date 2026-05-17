import { Router } from 'express'
import { MedicoController } from '../controllers/turnoController.js'
import { MedicoService } from "../services/turnoService.js"
import { validate, validateQuery } from '../middlewares/validate.js'
import { consultarDisponibilidadSchema } from '../schemas/requestsSchemas/medicoRequestSchema.js'

const router = Router()
const service = new MedicoService()
const controller = new MedicoController()

router.get(
    "/disponibilidades",
    validate(consultarDisponibilidadSchema),
    controller.consultarDisponibilidades()
)

router.path(
    "/:id/modificar",
    validate(modificarDisponibilidadSchema),
    controller.modificarDisponibilidades()
)

router.post(
    "/:id/agregarServicio",
    validate(agregarServicioSchema),
    controller.agregarServicio()
)

router.delete(
    "/:id/eliminarServicio",
    validate(eliminarServicioSchema),
    controller.eliminarServicio()
)

router.patch(
    "/:id/modificarServicio",
    validate(modificarServicioSchema),
    controller.modificarServicio()
)