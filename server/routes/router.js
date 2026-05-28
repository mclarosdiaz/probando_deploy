import express from "express"
import healthRoutes from "./healthRoutes.js"
import turnoRoutes from "./turnoRoutes.js"
import medicoRoutes from "./medicoRoutes.js"
import notificacionRoutes from "./notificacionRoutes.js"

const router = express.Router()

router.use('/health', healthRoutes)
router.use('/turnos', turnoRoutes)
router.use('/medico', medicoRoutes)
router.use('/notificaciones',notificacionRoutes)



export default router