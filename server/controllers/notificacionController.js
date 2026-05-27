import { response } from "express";
import { NotificacionService } from "../services/notificacionService.js";

export class NotificacionController{
    constructor(notificacionService = new NotificacionService()){
        this.notificacionService= notificacionService
    }
    
    mostrarNoLeidas = async (req,res,next)=>{
    
        const { idUsuario } = req.params
        try{
            const notificacionesNoLeidas = await this.notificacionService.mostrarNoLeidas({idUsuario})
            res.status(200).json(notificacionesNoLeidas)
        }
        catch(error){
            next(error)
        }
    }
    mostrarLeidas = async (req,res,next)=>{
        
        const { idUsuario } = req.params
        try{
            const notificacionesLeidas = await this.notificacionService.mostrarLeidas({idUsuario})
            res.status(200).json(notificacionesLeidas)
        }
        catch(error){
            next(error)
        }
    }
    marcarComoLeida = async(req,res,next)=>{
        const { idUsuario , idNotificacion } = req.params
        try{
            const data = await this.notificacionService.marcarComoLeida(idNotificacion)
            res.status(200).json(data)
        }
        catch(error)
        {
            next(error)
        }
    }
}