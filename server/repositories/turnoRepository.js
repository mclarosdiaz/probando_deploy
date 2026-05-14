import { Turno } from "../domain/turno.js";
import {
    BadRequestError,
    TurnoNotFoundError,
    UnprocessableEntityError
} from "../errors/appError.js"


export class TurnoRepository{
    async save(turno){
        throw new Error("Not implemented")
    }

    async findById(id){
        throw new Error("Not implemented")
    }

    async findall({ filtros, paginacion } = {}){
        throw new Error("Not implemented")
    }

    async saveAll(turnos){
        throw new Error("Not implemented")
    }
}

export class MongoTurnoRepository extends TurnoRepository{
    
}

export class TurnoRepositoryMock extends TurnoRepository{
    constructor(){
        super()
        this.turnos = []
        this.nextId = 1
    }

    async save(turno){
        if(!turno.id){
            turno.id = this.nextId++
            this.turnos.push(turno)
        }else{
            const index = this.turnos.findIndex(t => t.id === turno.id)
            this.turnos[index] = turno
        }

        return turno
    }

    async saveAll(turnos){
        turnos.forEach(turno => this.save(turno))
    }

    async findById(id){
        return this.turnos.find(t => t.id === id)
    }

    async findall({ filtros, paginacion }){
        let resultado = [...this.turnos]

        if(filtros.pacienteId){
            resultado = resultado.filter(t => t.pacienteId === filtros.pacienteId)
        }

        if(filtros.estado){
            resultado = resultado.filter(t => t.estado === filtros.estado)
        }

        if(filtros.fechaDesde){
            resultado = resultado.filter(t => t.fecha >= filtros.fechaDesde)
        }

        if(filtros.fechaHasta){
            resultado = resultado.filter(t => t.fecha <= filtros.fechaHasta)
        }
        
        const total = resultado.length

        const { page, limit } = paginacion
        const offset = (page - 1) * limit

        const data = resultado.slice(offset, offset + limit)

        return{
            data, 
            total
        }
    }
}