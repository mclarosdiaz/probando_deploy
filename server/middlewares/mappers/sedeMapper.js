import { Sede } from "../../domain/sede.js"

class SedeMapper{
    
    mongoSedeToDomain(data){
        const sede = new Sede(
            data.nombre,
            data.direccion
        )
        sede.id = data._id.toString()
        return sede
    }

    sedeToDTO(sede){
        return {
            id: sede.id,
            nombre: sede.nombre,
            direccion: sede.direccion
        }
    } 

}

export const sedeMapper = new SedeMapper() 