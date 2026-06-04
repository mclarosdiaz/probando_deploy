import { Practica } from "../../domain/practica.js"
class PracticaMapper{


    async mongoPracticaToDomain(data){
        const id = data.id
        const codigo = data.codigo
        const nombre = data.nombre
        const duracionTurnoEnMins = data.duracionTurnoEnMins
        const costo = data.costo
        console.log("PRACTICA DATA:", JSON.stringify(data))
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