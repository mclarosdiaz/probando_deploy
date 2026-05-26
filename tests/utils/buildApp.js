import express from "express"
import { validate, validateQuery } from "../../server/middlewares/validate.js"
import { TurnoService } from "../../server/services/turnoService.js"
import { TurnoController } from "../../server/controllers/turnoController.js"
import { MedicoController } from "../../server/controllers/medicoController.js"
import { MedicoService } from "../../server/services/medicoService.js"
import { cancelarTurnoRequestSchema,
         reservarTurnoSchema,
         generarTurnosDisponiblesSchema,
         obtenerHistorialTurnosSchema,
         busquedaDeTurnosDisponibles,
         modificarEstadoTurnoSchema,
         modificarFechaTurnoSchema,
         
  } from "../../server/schemas/requestsSchemas/turnoRequestSchemas.js"
import {
    consultarDisponibilidadSchema,
    modificarDisponibilidadSchema
}from "../../server/schemas/requestsSchemas/medicoRequestSchema.js"


export function buildTestApp(turnoRepository, pacienteRepository, medicoRepository){
    const turnoService = new TurnoService(turnoRepository, pacienteRepository, medicoRepository)
    const turnoController = new TurnoController(turnoService)

    const medicoService = new MedicoService(medicoRepository)
    const medicoController = new MedicoController(medicoService)

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

    turnoRouter.get(
        "/turnos/:idPaciente/turnosDisponibles", 
        validate(busquedaDeTurnosDisponibles),
        turnoController.buscarTurnosDisponibles
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

    app.use(turnoRouter)
    app.use(medicoRouter)
   
    return app
}

