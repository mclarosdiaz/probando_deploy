import express from "express"
import dotenv from "dotenv"
import router from "./routes/router.js"
import { errorHandler } from "./errors/errorHandler.js"
import { notFoundHandler } from "./errors/notFoundHandler.js"

dotenv.config()

const app = express()

app.use(express.json())
app.use(router)
app.use(errorHandler)
app.use(notFoundHandler)

export default app