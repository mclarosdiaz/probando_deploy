import { Especialidad } from "../../domain/especialidad.js"



class EspecialidadMapper{

    mongoEspecialidadToDomain(data){
       
        const especialidad = new Especialidad(
            data.id,
            data.nombre,
            data.duracionTurnoEnMins,
            data.costo
        )

      

        return especialidad
    }

    especialidadToDTO(especialidad){
        return{
            id:especialidad.id,
            nombre:especialidad.nombre,
            duracionTurnoEnMins:especialidad.duracionEnMins,
            costo:especialidad.costo
        }
    }


}


export const especialidadMapper = new EspecialidadMapper()