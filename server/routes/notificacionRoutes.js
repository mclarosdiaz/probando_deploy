import { Router } from "express";
import { NotificacionService } from "../services/notificacionService";
import { NotificacionController } from "../controllers/notificacionController";
import { validate,validateQuery } from "../middlewares/validate"
import {
    mostrarNoLeidasSchema,
    mostrarLeidasSchema,
    marcarComoLeidaSchema
} from "../schemas/requestsSchemas/notificacionRequestSchema.js"
import { MongoTurnoRepository } from '../repositories/turnoRepository.js'
import { MongoMedicoRepository } from '../repositories/medicoRepository.js'
import { MongoNotificacionRepository } from '../repositories/notificacionRepository.js'
import { MongoSedeRepository } from '../repositories/sedeRepository.js'
import { MongoUsuarioRepository } from '../repositories/usuarioRepository.js'
import { MongoPacienteRepository } from '../repositories/pacienteRepository.js'

const router=Router()
const notificacionService = new NotificacionService()

const controller = new NotificacionController({notificacionService})

router.get(
    "/:idUsuario/mostrarNoLeidas",
    validate(mostrarNoLeidasSchema),
    controller.mostrarNoLeidas
)
router.get(
    "/:idUsuario/mostrarLeidas",
    validate(mostrarLeidasSchema),
    controller.mostrarLeidas
)
router.patch(
    "/:idUsuario/:idNotifiacion/marcarComoLeida",
    validate(marcarComoLeidaSchema),
    controller.marcarComoLeida
)

export default router