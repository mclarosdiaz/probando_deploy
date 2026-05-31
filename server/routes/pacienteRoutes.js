import { Router } from "express";
import { TurnoController } from "../controllers/turnoController.js";
import { TurnoService } from "../services/turnoService.js";

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


router.get(
    "/:pacienteId/turnos",
    controller.obtenerHistorialTurnos)