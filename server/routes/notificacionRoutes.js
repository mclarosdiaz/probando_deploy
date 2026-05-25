import { Router } from "express";
import { NotificacionService } from "../services/notificacionService";
import { NotificacionController } from "../controllers/notificacionController";
import { validate,validateQuery } from "../middlewares/validate"
import {
    mostrarNoLeidasSchema,
    mostrarLeidasSchema,
    marcarComoLeidaSchema
} from "../schemas/requestsSchemas/notificacionRequestSchema.js"

const router=Router()
const notificacionService = new NotificacionService()
const controller = new NotificacionController({notificacionService})

router.get(
    "/usuarios/:idUsuario/mostrarNoLeidas",
    validate(mostrarNoLeidasSchema),
    controller.mostrarNoLeidas
)
router.get(
    "/usuarios/:idUsuario/mostrarLeidas",
    validate(mostrarLeidasSchema),
    controller.mostrarLeidas
)
router.patch(
    "/usuarios/:idUsuario/:idNotifiacion/marcarComoLeida",
    validate(marcarComoLeidaSchema),
    controller.marcarComoLeida
)