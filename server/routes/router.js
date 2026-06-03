import express from "express"
import healthRoutes from "./healthRoutes.js"
import turnoRoutes from "./turnoRoutes.js"
import medicoRoutes from "./medicoRoutes.js"
import usuarioRoutes from "./usuarioRoutes.js"
import pacienteRoutes from "./pacienteRoutes.js"

const router = express.Router()

router.use('/health', healthRoutes)
router.use('/turnos', turnoRoutes)
router.use('/medico', medicoRoutes)
router.use('/usuario',usuarioRoutes)
router.use('/paciente',pacienteRoutes)


export default router