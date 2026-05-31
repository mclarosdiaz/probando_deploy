import { Router } from "express";
import { NotificacionService } from "../services/notificacionService.js";
import { NotificacionController } from "../controllers/notificacionController.js";
import { validate,validateQuery } from "../middlewares/validate.js"
import {
    marcarComoLeidaSchema,
    mostrarNotificacionesSchema
} from "../schemas/requestsSchemas/notificacionRequestSchema.js"
import { MongoNotificacionRepository } from '../repositories/notificacionRepository.js'
import { MongoUsuarioRepository } from '../repositories/usuarioRepository.js'

const router=Router()

const notificacionRepository = new MongoNotificacionRepository()

const notificacionService = new NotificacionService(notificacionRepository)
const controller = new NotificacionController(notificacionService)


router.get(
    "/:idUsuario//notificaciones",
    validate(mostrarNotificacionesSchema),
    controller.mostrarNotificaciones
)

router.patch(
    "/:idUsuario/notificaciones/:idNotificacion",
    validate(marcarComoLeidaSchema),
    controller.marcarComoLeida
)

export default router