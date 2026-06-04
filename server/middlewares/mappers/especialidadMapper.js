import { Especialidad } from "../../domain/especialidad.js"



class EspecialidadMapper{

    mongoEspecialidadToDomain(data){
         console.log("ESPECIALIDAD DATA:", JSON.stringify(data))
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
            duracionEnMins:especialidad.duracionEnMins,
            costo:especialidad.costo
        }
    }

}


export const especialidadMapper = new EspecialidadMapper()