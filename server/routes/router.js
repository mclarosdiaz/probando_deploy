import express from "express"
import healthRoutes from "./healthRoutes.js"
import turnoRoutes from "./turnoRoutes.js"
import medicoRoutes from "./medicoRoutes.js"

const router = express.Router()

router.use('/health', healthRoutes)
router.use('/turnos', turnoRoutes)
router.use('/medico', medicoRoutes)



export default router