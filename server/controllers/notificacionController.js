import { response } from "express";
import { NotificacionService } from "../services/notificacionService.js";

export class NotificacionController{
    constructor(notificacionService = new NotificacionService()){
        this.notificacionService= notificacionService
    }
    
    mostrarNoLeidas = async (req,res,next)=>{
        const { id } = req.params
        try{
            const notificacionesNoLeidas = await this.notificacionService.mostrarLeidas({id})
            res.json(notificacionesNoLeidas)
        }
        catch(error){
            next(error)
        }
    }
    mostrarLeidas = async (req,res,next)=>{
        const { id } = req.params
        try{
            const notificacionesLeidas = await this.notificacionService.mostrarLeidas({id})
            res.json(notificacionesLeidas)
        }
        catch(error){
            next(error)
        }
    }
    marcarComoLeida = async(req,res,next)=>{
        const { id } = req.params
        try{
            this.notificacionService.marcarComoLeida(id)
        }
        catch(error)
        {
            next(error)
        }
    }
}