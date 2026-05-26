import { Router } from 'express'
import { TurnoController } from '../controllers/turnoController.js'
import { TurnoService } from "../services/turnoService.js"
import { validate, validateQuery } from '../middlewares/validate.js'
import { 
    reservarTurnoSchema,
    cancelarTurnoRequestSchema,
    obtenerHistorialTurnosSchema,
    marcarComoRealizadoSchema,
    modificarEstadoTurnoSchema,
    generarTurnosDisponiblesSchema,
    modificarFechaTurnoSchema
 } from '../schemas/requestsSchemas/turnoRequestSchemas.js'


 const router = Router()
 const turnoService = new TurnoService()
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