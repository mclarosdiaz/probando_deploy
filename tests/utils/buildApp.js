import express from "express"
import { validate } from "../../server/middlewares/validate.js"
import { TurnoService } from "../../server/services//turnoService.js"
import { TurnoController } from "../../server/controllers/turnoController.js"
import { MedicoController } from "../../server/controllers/medicoController.js"
import { MedicoService } from "../../server/services/medicoService.js"
import { NotificacionService } from "../../server/services/notificacionService.js"
import { NotificacionController} from "../../server/controllers/notificacionController.js"
import { cancelarTurnoRequestSchema,
         reservarTurnoSchema,
         generarTurnosDisponiblesSchema,
         obtenerHistorialTurnosSchema,
         modificarEstadoTurnoSchema,
         modificarFechaTurnoSchema,
         
  } from "../../server/schemas/requestsSchemas/turnoRequestSchemas.js"
import {
    consultarDisponibilidadSchema,
    modificarDisponibilidadSchema,
    agregarServicioSchema,
    eliminarServicioSchema,
    modificarServicioSchema
}from "../../server/schemas/requestsSchemas/medicoRequestSchema.js"
import {
    mostrarNoLeidasSchema,
    mostrarLeidasSchema,
    marcarComoLeidaSchema
} from "../../server/schemas/requestsSchemas/notificacionRequestSchema.js"

export function buildTestApp({turnoRepository, pacienteRepository, medicoRepository, notificacionRepository}){
    const turnoService = new TurnoService(turnoRepository, pacienteRepository, medicoRepository)
    const turnoController = new TurnoController(turnoService)

    const medicoService = new MedicoService(medicoRepository)
    const medicoController = new MedicoController(medicoService)

    const notificacionService = new NotificacionService(notificacionRepository)
    const notificacionController = new NotificacionController(notificacionService)

    const app = express()
    app.use(express.json())

    const turnoRouter = express.Router()

    turnoRouter.patch(
        "/turnos/:id/reservar",
        validate(reservarTurnoSchema),
        turnoController.reservar
    )
    
    turnoRouter.get(
        "/turnos",
        validate(obtenerHistorialTurnosSchema),
        turnoController.obtenerHistorialTurnos
    )
    
    turnoRouter.patch(
        "/turnos/:id/cancelar",
        validate(cancelarTurnoRequestSchema),
        turnoController.cancelarTurno
    )
    
    turnoRouter.patch(
        "/turnos/:id/confirmado",
        validate(modificarEstadoTurnoSchema),
        turnoController.marcarComoConfirmado
    )
    
    turnoRouter.patch(
        "/turnos/:id/realizado",
        validate(modificarEstadoTurnoSchema),
        turnoController.marcarComoRealizado
    )
    
    turnoRouter.post(
        "/turnos/generarTurnosDisponibles",
        validate(generarTurnosDisponiblesSchema),
        turnoController.generarTurnosDisponibles
    )
    
    turnoRouter.patch(
        "/turnos/:id/modificarFecha",
        validate(modificarFechaTurnoSchema),
        turnoController.modificarFechaTurno
    )

    const medicoRouter = express.Router()


    medicoRouter.get(
        "/medicos/disponibilidades",
        validate(consultarDisponibilidadSchema),
        medicoController.consultarDisponibilidades
    )
    
    medicoRouter.patch(
        "/medicos/:id/modificarDisponibilidad",
        validate(modificarDisponibilidadSchema),
        medicoController.modificarDisponibilidades
    )
     medicoRouter.post(
        "/medicos/:id/agregarServicio",
        validate(agregarServicioSchema),
        medicoController.agregarServicio
    )
    medicoRouter.delete(
        "/medicos/:idMedico/eliminarServicio/:idServicio",
        validate(eliminarServicioSchema),
        medicoController.eliminarServicio
    )
    
    medicoRouter.patch(
        "/medicos/:idMedico/modificarServicio",
        validate(modificarServicioSchema),
        medicoController.modificarServicio
    )

    const notificacionRouter = express.Router()

    notificacionRouter.get(
        "/usuarios/:idUsuario/mostrarNoLeidas",
        validate(mostrarNoLeidasSchema),
        notificacionController.mostrarNoLeidas
    )
    notificacionRouter.get(
        "/usuarios/:idUsuario/mostrarLeidas",
        validate(mostrarLeidasSchema),
        notificacionController.mostrarLeidas
    )
    notificacionRouter.patch(
        "/usuarios/:idUsuario/:idNotificacion/marcarComoLeida",
        validate(marcarComoLeidaSchema),
        notificacionController.marcarComoLeida
    )

    app.use(turnoRouter)
    app.use(medicoRouter)
    app.use(notificacionRouter)

    return app
}

