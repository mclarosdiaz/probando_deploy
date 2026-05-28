import { response } from "express";
import { NotificacionService } from "../services/notificacionService.js";

export class NotificacionController{
    constructor(notificacionService = new NotificacionService()){
        this.notificacionService= notificacionService
    }
    
    mostrarNoLeidas = async (req,res,next)=>{
    
        
        try{
            const { idUsuario } = req.params

            const notificacionesNoLeidas = await this.notificacionService.mostrarNoLeidas({idUsuario})
            res.status(200).json(notificacionesNoLeidas)
        }
        catch(error){
            next(error)
        }
    }


    mostrarLeidas = async (req,res,next)=>{
        
        try{
            const { idUsuario } = req.params

            const notificacionesLeidas = await this.notificacionService.mostrarLeidas({idUsuario})
            res.status(200).json(notificacionesLeidas)
        }
        catch(error){
            next(error)
        }
    }
    marcarComoLeida = async(req,res,next)=>{
        try{
            const { idUsuario, idNotificacion } = req.params

            const data = await this.notificacionService.marcarComoLeida(idUsuario, idNotificacion)
            res.status(200).json(data)
        }
        catch(error)
        {
            next(error)
        }
    }
}