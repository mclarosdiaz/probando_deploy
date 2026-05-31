import { Especialidad } from "../../domain/especialidad.js"



class EspecialidadMapper{

    mongoEspecialidadToDomain(data){

        const especialidad = new Especialidad(
            data.nombre,
            data.duracionEnMins,
            data.costo
        )

        especialidad.id = data._id.toString()

        return especialidad
    }

    especialidadToDTO(especialidad){
        return{
            id:especialidad.id,
            nombre:especialidad.nombre,
            duracionEnMins:especialidad.duracionEnMins,
            costo:especialidad.costo
        }
    }

}


export const especialidadMapper = new EspecialidadMapper()