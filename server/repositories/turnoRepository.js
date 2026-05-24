import { Turno } from "../domain/turno.js";
import {
    BadRequestError,
    TurnoNotFoundError,
    UnprocessableEntityError
} from "../errors/appError.js"
import { TurnoModel } from "../schemas/DBSchemas/turnoSchema.js";


export class MongoTurnoRepository {
    constructor() {
        this.model = TurnoModel 
    }

    async save(turno){
        const nuevoTurno = new this.model(turno)
        return await nuevoTurno.save
    }

    async saveAll(turnos){
        const nuevosTurnos = turnos.map(turno => {
            const nuevoTurno = new this.model(turno)
            return nuevoTurno.save()
        })
        return await Promise.all(nuevosTurnos)
    }

    async findById(id){
        return await this.model.findById(id)
    }

    async findAll({ filtros, paginacion } = {}){
        const query = {}

        if(filtros.pacienteId){
            query.pacienteId = filtros.pacienteId
        }

        if(filtros.estado){
            query.estado = filtros.estado
        }

        if(filtros.fechaDesde || filtros.fechaHasta){
            if(filtros.fechaDesde){
                query.fecha.$gte = filtros.fechaDesde
            }

            if(filtros.fechaHasta){
                query.fecha.$lte = filtros.fechaHasta
            }
        }

        const { page, limit } = paginacion

        const [data, total] = await Promise.all([
            TurnoModel
                .find(query)
                .skip(offset)
                .limit(limit),

                TurnoModel.countDocuments(query)
        ])

        return {
            data, 
            total
        }

    }

}

