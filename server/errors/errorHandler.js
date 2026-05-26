import { AppError} from "./appError"

export const errorHandler = (err, req, res, next) =>{
    console.error({
        timeStamp: new Date().toISOString(), 
        method: req.method,
        path: req.originalUrl,
        error: {
            name: err.name,
            message: err.message, 
            stack: err.stack
        }
    })

    if(err instanceof AppError)
    {
        return res.status(err.statusCode)
        .json( {
            status: err.status,
            message: err.message,
            timeStamp: err.timestamp
        })

    }
    
    return res.status(500).json({
        status: "error",
        message: "Error interno del servidor",
        timeStamp: new Date().toISOString()
    })

    
}