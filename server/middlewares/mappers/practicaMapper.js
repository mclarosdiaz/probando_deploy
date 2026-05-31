import { Practica } from "../../domain/practica.js"
class PracticaMapper{


    async mongoPracticaToDomain(data){
        const id = data.id
        const codigo = data.practica
        const nombre = data.nombre
        const duracionTurnoEnMins = data.duracionTurnoEnMins
        const costo = data.costo
        
        const practica = new Practica(
            id,
            codigo,
            nombre,
            duracionTurnoEnMins,
            costo
        )
        return practica
    }
    practicaToDto(practica){
        return{
            id: practica.id,
            codigo : practica.codigo,
            nombre: practica.nombre,
            duracionTurnoEnMins : practica.duracionTurnoEnMins,
            costo: practica.costo
        }
    }
}

export const practicaMapper = new PracticaMapper()