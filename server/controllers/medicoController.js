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
            res.status(200).json(disponibilidades)
        } catch (error) {
            next(error)
        }
        
    }

    modificarDisponibilidades = async(req,res,next)=>{
        const { idMedico } = req.params
        const { nuevasDisponibilidades }= req.body

        try{
            const disponibilidades= await this.medicoService.modificarDisponibilidades(idMedico, nuevasDisponibilidades)
            res.status(200).json(disponibilidades)
        } catch (error) {
            next(error)
        }

    }
    
    agregarServicio = async(req,res,next)=>{
        const { idMedico } = req.params
        const  nuevoServicio  = req.body

        try{
            const medicoActualizado = await this.medicoService.agregarServicio(idMedico, nuevoServicio)
            res.status(200).json(medicoActualizado)
        } catch(error){
            next(error)
        }
    }

    eliminarServicio = async(req,res,next)=>{
        const { idMedico, idServicio } = req.params

        try{
            const medicoActualizado = await this.medicoService.eliminarServicio(idMedico, idServicio)
            res.status(200)
        } catch(error){
            next(error)
        }
    }

    modificarServicio = async(req,res,next)=>{
        const { idMedico } = req.params
        const  servicioModificado  = req.body

        try{
            const medicoActualizado = await this.medicoService.modificarServicio(idMedico, servicioModificado)
            res.status(200).json(medicoActualizado)
        } catch(error){
            next(error)
        }
    }
    
}