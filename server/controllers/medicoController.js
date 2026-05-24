import { response } from "express"
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
            this.medicoService.modificarDisponibilidades(idMedico, nuevasDisponibilidades)
        } catch (error) {
            next(error)
        }

    }
    
    agregarServicio = async(req,res,next)=>{
        const { idMedico } = req.params
        const { nuevoServicio } = req.body

        try{
            this.medicoService.agregarServicio(idMedico, nuevoServicio)
        } catch(error){
            next(error)
        }
    }

    eliminarServicio = async(req,res,next)=>{
        const { idMedico, idServicio } = req.params

        try{
            this.medicoService.eliminarServicio(idMedico, idServicio)
        } catch(error){
            next(error)
        }
    }

    modificarServicio = async(req,res,next)=>{
        const { idMedico, idServicio } = req.params
        const { servicioModificado } = req.body

        try{
            this.medicoService.modificarServicio(idMedico, idServicio, servicioModificado)
        } catch(error){
            next(error)
        }
    }
    
}