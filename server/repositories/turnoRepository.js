import { Turno } from "../domain/turno.js";
import {
    BadRequestError,
    TurnoNotFoundError,
    UnprocessableEntityError
} from "../errors/appError.js"
import { TurnoModel } from "../schemas/DBSchemas/turnoSchema.js";
import { reservarTurnoSchema } from "../schemas/requestsSchemas/turnoRequestSchemas.js";


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
        const query = turno.id ? { _id: turno.id } : { _id: new this.model()._id } 
        
        if(turno.id){
            return await this.model.findOneAndUpdate(
                query,
                turno,
                {
                    new: true
                }
            )
        }
        
        return await this.model.create(turno)
    }

    async saveAll(turnos){
        return await Promise.all(
            turnos.map(turno =>
                this.save(turno)
            )
        )
    }

    async findById(id){
        const mongoTurno = await this.model.findById(id)

        if(!mongoTurno){
            throw new TurnoNotFoundError(`El turno ${id} no fue encontrado`)
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

