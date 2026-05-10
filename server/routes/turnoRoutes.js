import { Router } from 'express'
import { TurnoController } from '../controllers/turnoController.js'
import { TurnoService } from "../services/turnoService.js"
import { validate, validateQuery } from '../middlewares/validate.js'
import { 
    reservarTurnoSchema,
    cancelarTurnoRequestSchema,
    obtenerHistorialTurnosSchema,
    marcarComoRealizadoSchema
 } from '../schemas/turnoSchemas.js'


 const router = Router()
 const turnoService = new TurnoService()
 const controller = new TurnoController({turnoService})

router.post(
    "/:id/reservar",
    validate(reservarTurnoSchema),
    controller.reservar
)

router.get(
    "/",
    validateQuery(obtenerHistorialTurnosSchema),
    controller.obtenerHistorialTurnos
)

router.post(
    "/:id/cancelar",
    validate(cancelarTurnoRequestSchema),
    controller.cancelar
)

router.patch(
    "/:id/confirmado",
    validate(marcarComoConfirmadoSchema),
    controller.marcarComoConfirmado
)

router.patch(
    "/:id/realizado",
    validate(marcarComoRealizadoSchema),
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


export default router