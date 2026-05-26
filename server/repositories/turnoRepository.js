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

    toDomain(mongoTurno){
        const data = mongoTurno.toObject()

        const turno = new Turno(
            data.medico,
            data.fechaHora,
            data.sede,
            data.estado,
            data.costo
        )

        turno.historialEstados = data.historialEstados

        if(data.paciente){
            turno.paciente = data.paciente
        }

        return turno
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
        const mongoTurno = await this.model.findById(id)

        if(!mongoTurno){
            throw new TurnoNotFoundError()
        }

        return this.toDomain(mongoTurno)
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

        const page = paginacion.page || 1
        const limit = paginacion.limit || 10

        const offset = (page - 1) * limit

        const [documents, total] = await Promise.all([
            this.model
                .find(query)
                .skip(offset)
                .limit(limit),

                this.model.countDocuments(query)
        ])

        const data = documents.map(doc => this.toDomain(doc))

        return {
            data, 
            total
        }

    }

}

