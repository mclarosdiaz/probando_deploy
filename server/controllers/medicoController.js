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
        const { idMedico} = req.params
        const { nuevasDisponibilidades}= req.body

        try{
            this.medicoService.modificarDisponibilidades(nuevasDisponibilidades)
        } catch (error) {
            next(error)
        }


    }
    
    
}