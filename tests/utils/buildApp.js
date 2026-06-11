import express from "express"
import { errorHandler } from "../../server/errors/errorHandler.js"
import { notFoundHandler } from "../../server/errors/notFoundHandler.js"
import router from "../../server/routes/router.js"


export function buildTestApp(){
    const app = express()
    app.use(express.json())
    app.use(router)
    app.use(errorHandler)
    app.use(notFoundHandler)

    return app

}

