import express from "express"
import { validate } from "../../server/middlewares/validate.js"
import { TurnoService } from "../../server/services/turnoService.js"
import { TurnoController } from "../../server/controllers/turnoController.js"
import { MedicoController } from "../../server/controllers/medicoController.js"
import { MedicoService } from "../../server/services/medicoService.js"
import { generarTurnosDisponiblesSchema,  } from "../../server/schemas/requestsSchemas/turnoRequestSchemas.js"


export function buildTestApp(turnoRepository, medicoRepository){
    const turnoService = new TurnoService({ turnoRepository })
    const turnoController = new TurnoController({ turnoService })

    const medicoService = new MedicoService({ medicoRepository })
    const medicoController = new MedicoController({ medicoService })

    const app = express()
    app.use(express.json())

    const turnoRouter = express.Router()
    turnoRouter.patch(
        "turnos/:id/reservar",
        validate(reservarTurnoSchema),
        controller.reservar
    )
    
    turnoRouter.patch(
        "turnos/",
        validateQuery(obtenerHistorialTurnosSchema),
        controller.obtenerHistorialTurnos
    )
    
    turnoRouter.post(
        "turnos/:id/cancelar",
        validate(cancelarTurnoRequestSchema),
        controller.cancelar
    )
    
    turnoRouter.patch(
        "turnos/:id/confirmado",
        validate(marcarComoConfirmadoSchema),
        controller.marcarComoConfirmado
    )
    
    turnoRouter.patch(
        "turnos/:id/realizado",
        validate(marcarComoRealizadoSchema),
        controller.marcarComoRealizado
    )
    
    turnoRouter.post(
        "turnos/generarTurnosDisponibles",
        validate(generarTurnosDisponiblesSchema),
        controller.generarTurnosDisponibles
    )
    
    turnoRouter.patch(
        "turnos/:id/modificarFecha",
        validate(modificarFechaTurnoSchema),
        controller.modificarFechaTurno
    )

    const medicoRouter = express.Router()
    medicoRouter.get(
        "medicos/disponibilidades",
        validate(consultarDisponibilidadSchema),
        controller.consultarDisponibilidades()
    )
    
    medicoRouter.patch(
        "medicos/:id/modificarDisponibilidad",
        validate(modificarDisponibilidadSchema),
        controller.modificarDisponibilidades()
    )
}

