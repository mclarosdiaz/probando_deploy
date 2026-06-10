import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { TurnoController } from "../controllers/turnoController.js";
import { TurnoService } from "../services/turnoService.js";
import { MongoTurnoRepository } from "../repositories/turnoRepository.js";
import { MongoPacienteRepository } from "../repositories/pacienteRepository.js";
import { MongoMedicoRepository } from "../repositories/medicoRepository.js";
import { MongoNotificacionRepository } from "../repositories/notificacionRepository.js"
import { MongoSedeRepository } from "../repositories/sedeRepository.js";
import { MongoUsuarioRepository } from "../repositories/usuarioRepository.js";
import { obtenerHistorialTurnosSchema } from "../schemas/requestsSchemas/turnoRequestSchemas.js";
const router = Router()

const turnoRepository = new MongoTurnoRepository()
const pacienteRepository = new MongoPacienteRepository()
const medicoRepository = new MongoMedicoRepository()
const notificacionRepository = new MongoNotificacionRepository()
const sedeRepository = new MongoSedeRepository()
const usuarioRepository = new MongoUsuarioRepository()

const turnoService = new TurnoService(turnoRepository, 
    pacienteRepository, 
    medicoRepository, 
    notificacionRepository, 
    sedeRepository, 
    usuarioRepository)
    
const controller = new TurnoController(turnoService)

//TODO Comenzar a usar asyncHandler

router.get(
    "/:pacienteId/turnos",
    validate(obtenerHistorialTurnosSchema),
    controller.obtenerHistorialTurnos)

export default router