import { NotFoundError } from "./appError.js";

export function notFoundHandler(req, res, next){
    next(new NotFoundError(`Ruta ${req.originalUrl} no encontrada`))
}