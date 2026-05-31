import { Plan } from "../../domain/sede"
import { CoberturaEspecialidad } from "../../domain/coberturaEspecialidad.js"
import { CoberturaPractica } from "../../domain/coberturaPractica.js"
import { especialidadMapper } from "./especialidadMapper.js"
import { practicaMapper } from "./practicaMapper.js"

class PlanMapper{
    constructor(especialidadMapper, practicaMapper) {
        this.especialidadMapper = especialidadMapper
        this.practicaMapper = practicaMapper
    }
    
    mongoPlanToDomain(data){
        
        const coberturaEspecialidad = data.coberturaEspecialidad ?
        data.coberturaEspecialidad.map(coberturaMongo => {
            return new CoberturaEspecialidad(
                this.especialidadMapper.mongoEspecialidadToDomain(coberturaMongo.especialidad),
                coberturaMongo.nivel
            )
        }) 
        :null

        const coberturaPractica = data.coberturaPractica ?
        data.coberturaPractica.map(coberturaMongo => {
            return new CoberturaPractica(
                this.practicaMapper.mongoPracticaToDomain(coberturaMongo.practica),
                coberturaMongo.nivel
            )
        }) 
        :null
        
        const plan = new Plan(
            data.id.toString(),
            data.nombre.toString(),
            coberturaEspecialidad,
            coberturaPractica
        )
        return plan
    }

    planToDTO(plan){
        return {
            id: plan.id,
            nombre: plan.nombre,
            coberturaEspecialidad: plan.coberturaEspecialidad,
            coberturaPractica: plan.coberturaPractica
        }
    } 

}

export const planMapper = new PlanMapper(especialidadMapper, practicaMapper) 