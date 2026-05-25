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
            res.json(notificacionesNoLeidas)
        }
        catch(error){
            next(error)
        }
    }
    mostrarLeidas = async (req,res,next)=>{
        
        const { idUsuario } = req.params
        try{
            const notificacionesLeidas = await this.notificacionService.mostrarLeidas({idUsuario})
            res.json(notificacionesLeidas)
        }
        catch(error){
            next(error)
        }
    }
    marcarComoLeida = async(req,res,next)=>{
        const { idUsuario , idNotificacion } = req.params
        try{
            this.notificacionService.marcarComoLeida(idNotificacion)
            res.sendStatus(200)
        }
        catch(error)
        {
            next(error)
        }
    }
}