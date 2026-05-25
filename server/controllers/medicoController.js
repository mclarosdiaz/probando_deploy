import { response, request } from "express"
import { MedicoService } from "../services/medicoService.js"

export class MedicoController{
    constructor(medicoService = new MedicoService()){
        this.medicoService = medicoService
    }

    consultarDisponibilidades = async (req,res,next)=>{
        const { idMedico } = req.params
        const{ servicio, idServicio } = req.body

        try {
            const disponibilidades= await this.medicoService.consultarDisponibilidades({
                idMedico,
                servicio,
                idServicio
            })
            res.json(disponibilidades)
        } catch (error) {
            next(error)
        }
        
    }

    modificarDisponibilidades = async(req,res,next)=>{
        const { idMedico } = req.params
        const { nuevasDisponibilidades }= req.body

        try{
            await this.medicoService.modificarDisponibilidades(idMedico, nuevasDisponibilidades)
        } catch (error) {
            next(error)
        }

    }
    
    agregarServicio = async(req,res,next)=>{
        const { idMedico } = req.params
        const  nuevoServicio  = req.body

        try{
            await this.medicoService.agregarServicio(idMedico, nuevoServicio)
            res.sendStatus(200)
        } catch(error){
            next(error)
        }
    }

    eliminarServicio = async(req,res,next)=>{
        const { idMedico, idServicio } = req.params

        try{
            await this.medicoService.eliminarServicio(idMedico, idServicio)
            res.sendStatus(200)
        } catch(error){
            next(error)
        }
    }

    modificarServicio = async(req,res,next)=>{
        const { idMedico } = req.params
        const  servicioModificado  = req.body

        try{
            await this.medicoService.modificarServicio(idMedico, servicioModificado)
            res.sendStatus(200)
        } catch(error){
            next(error)
        }
    }
    
}