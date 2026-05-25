import express from "express"
import { validate } from "../../server/middlewares/validate.js"
import { TurnoService } from "../../server/services/turnoService.js"
import { TurnoController } from "../../server/controllers/turnoController.js"
import { MedicoController } from "../../server/controllers/medicoController.js"
import { MedicoService } from "../../server/services/medicoService.js"
import { generarTurnosDisponiblesSchema,  } from "../../server/schemas/requestsSchemas/turnoRequestSchemas.js"
import { agregarServicioSchema } from "../../server/schemas/requestsSchemas/medicoRequestSchema.js"
import { reservarTurnoSchema } from "../../server/schemas/requestsSchemas/turnoRequestSchemas.js"
import { obtenerHistorialTurnosSchema } from "../../server/schemas/requestsSchemas/turnoRequestSchemas.js"
import { cancelarTurnoRequestSchema } from "../../server/schemas/requestsSchemas/turnoRequestSchemas.js"
import { maracarComoConfirmadoSchema } from "../../server/schemas/requestsSchemas/turnoRequestSchemas.js"
import { marcarComoRealizadoSchema } from "../../server/schemas/requestsSchemas/turnoRequestSchemas.js"
import { modificarFechaTurnoSchema } from "../../server/schemas/requestsSchemas/turnoRequestSchemas.js"
import { consultarDisponibilidadSchema } from "../../server/schemas/requestsSchemas/medicoRequestSchema.js"
import { modificarDisponibilidadSchema } from "../../server/schemas/requestsSchemas/medicoRequestSchema.js"
import { eliminarServicioSchema } from "../../server/schemas/requestsSchemas/medicoRequestSchema.js"
import { modificarServicioSchema } from "../../server/schemas/requestsSchemas/medicoRequestSchema.js"

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
        turnoController.reservar
    )
    
    turnoRouter.patch(
        "turnos/",
        validate(obtenerHistorialTurnosSchema),
        turnoController.obtenerHistorialTurnos
    )
    
    turnoRouter.post(
        "turnos/:id/cancelar",
        validate(cancelarTurnoRequestSchema),
        turnoController.cancelarTurno
    )
    
    turnoRouter.patch(
        "turnos/:id/confirmado",
        validate(maracarComoConfirmadoSchema),
        turnoController.marcarComoConfirmado
    )
    
    turnoRouter.patch(
        "turnos/:id/realizado",
        validate(marcarComoRealizadoSchema),
        turnoController.marcarComoRealizado
    )
    
    turnoRouter.post(
        "turnos/generarTurnosDisponibles",
        validate(generarTurnosDisponiblesSchema),
        turnoController.generarTurnosDisponibles
    )
    
    turnoRouter.patch(
        "turnos/:id/modificarFecha",
        validate(modificarFechaTurnoSchema),
        turnoController.modificarFechaTurno
    )

    const medicoRouter = express.Router()
    medicoRouter.get(
        "medicos/disponibilidades",
        validate(consultarDisponibilidadSchema),
        medicoController.consultarDisponibilidades
    )
    
    medicoRouter.patch(
        "medicos/:id/modificarDisponibilidad",
        validate(modificarDisponibilidadSchema),
        medicoController.modificarDisponibilidades
    )
    medicoRouter.post(
        "/:id/agregarServicio",
        validate(agregarServicioSchema),
        medicoController.agregarServicio
    )
    medicoRouter.delete(
        "medicos/:id/eliminarServicio",
        validate(eliminarServicioSchema),
        medicoController.eliminarServicio
    )
    
    medicoRouter.patch(
        "medicos/:id/modificarServicio",
        validate(modificarServicioSchema),
        medicoController.modificarServicio
    )

    app.use(turnoRouter)
    app.use("/medicos",medicoRouter)

    return app
}

