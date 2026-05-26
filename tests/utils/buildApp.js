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
         marcarComoConfirmadoSchema,
         marcarComoRealizadoSchema,
         busquedaDeTurnosDisponibles,
         modificarFechaTurnoSchema,
         
  } from "../../server/schemas/requestsSchemas/turnoRequestSchemas.js"
import {
    consultarDisponibilidadSchema,
    modificarDisponibilidadSchema
}from "../../server/schemas/requestsSchemas/medicoRequestSchema.js"


export function buildTestApp({turnoRepository, pacienteRepository, medicoRepository}){
    const turnoService = new TurnoService({turnoRepository, pacienteRepository, medicoRepository})
    const turnoController = new TurnoController({turnoService})

    const medicoService = new MedicoService({medicoRepository})
    const medicoController = new MedicoController({medicoService})

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
        validateQuery(obtenerHistorialTurnosSchema),
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
        validate(marcarComoConfirmadoSchema),
        turnoController.marcarComoConfirmado
    )
    
    turnoRouter.patch(
        "/turnos/:id/realizado",
        validate(marcarComoRealizadoSchema),
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

    // 🕵️ RADAR 1: Log de Entrada Global
    app.use((req, res, next) => {
        console.log(`\n➡️ [Express] Petición entrante: ${req.method} ${req.url}`);
        next();
    });

    /*
    app.use((err, req, res, next) => {
        console.error(`💥 [Express Catch] Error: ${err.message}`);
        console.error(`💥 [Stack Trace]:`, err.stack); // Esto nos dice el archivo y la línea exacta
        const status = err.statusCode || 500;
        res.status(status).json({ error: err.message });
    });
    /*
    //micrófono de errores
    app.use((err, req, res, next) => {
        console.error("💥 ERROR ATRAPADO POR EXPRESS:", err.message);
        res.status(500).json({ error: err.message });
    });
    */
   
    return app
}

