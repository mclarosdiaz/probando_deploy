import { especialidadMapper } from "../middlewares/mappers/especialidadMapper"
import { practicaMapper } from "../middlewares/mappers/practicaMapper"
import { disponibilidadHorariaMapper } from "../middlewares/mappers/disponibilidadHorariaMapper"
import { medicoMapper } from "../middlewares/mappers/medicoMapper"

export class MedicoController{
    //TODO Implementar biblioteca de Try-Catch de Gastón

    consultarDisponibilidades = async (req,res,next)=>{

        try {
            const { idMedico } = req.params
            const { tipoServicio, idServicio } = req.body

            const disponibilidades= await this.medicoService.consultarDisponibilidades({
                idMedico,
                tipoServicio,
                idServicio
            })

            const disponibilidadesDTO = disponibilidades.map(disponibilidad => disponibilidadHorariaMapper.disponibilidadHorariaToDTO(disponibilidad)) 

            res.status(200).json(disponibilidadesDTO)
        } catch (error) {
            next(error)
        }
        
    }

    modificarDisponibilidades = async(req,res,next)=>{

        try{
            const { idMedico } = req.params
            const { nuevasDisponibilidadesDTO } = req.body

            const nuevasDisponibilidades = nuevasDisponibilidadesDTO.map(dto => disponibilidadHorariaMapper.dtoToDisponibilidadHoraria(dto))

            const medicoActualizado = await this.medicoService.modificarDisponibilidades({idMedico, nuevasDisponibilidades})
            
            const medicoDTO = medicoMapper.medicoToDTO(medicoActualizado)

            res.status(200).json(medicoDTO)
        } catch (error) {
            next(error)
        }

    }
    
    agregarServicio = async(req,res,next)=>{
        
        try{
            const { idMedico } = req.params
            const { tipoServicio, nuevoServicioDTO } = req.body

            let nuevoServicio = undefined

            if (nuevoServicioDTO.codigo) {
                nuevoServicio = practicaMapper.practicaToDto(nuevoServicioDTO)
            } else {
                nuevoServicio = especialidadMapper.especialidadToDTO(nuevoServicioDTO)
            }

            const medicoActualizado = await this.medicoService.agregarServicio({idMedico, tipoServicio, nuevoServicio})

            const medicoDTO = medicoMapper.medicoToDTO(medicoActualizado)

            res.status(200).json(medicoDTO)
        } catch(error){
            next(error)
        }
    }

    eliminarServicio = async(req,res,next)=>{

        try{
            const { idMedico, tipo, idServicio } = req.params

            const medicoActualizado = await this.medicoService.eliminarServicio({idMedico, tipo, idServicio})
            const medicoDTO = medicoMapper.medicoToDTO(medicoActualizado)

            res.status(200).json(medicoDTO)
        } catch(error){
            next(error)
        }
    }

    modificarServicio = async(req,res,next)=>{
        const { idMedico, tipo,idServicio } = req.params
        const  servicioModificado  = req.body

        try{
            const medicoActualizado = await this.medicoService.modificarServicio({idMedico, tipo, idServicio, servicioModificado})
            res.status(200).json(medicoActualizado)
        } catch(error){
            next(error)
        }
    }
    
}