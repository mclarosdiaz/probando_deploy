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
        const mongoTurno = await this.model
            .findById(id)
            .populate({
                path: "medico",
                populate: {
                    path: "sedes"
                }
            })
            .populate("pacientes")

        if(!mongoTurno){
            throw new TurnoNotFoundError(`El turno ${id} no fue encontrado`)
        }

        return mongoTurno
    }

    async findAll({ filtros = {}, paginacion = {} } = {}){
        const query = {}

        if(filtros.pacienteId){
            query.paciente = filtros.pacienteId
        }

        if(filtros.estado){
            query.estado = filtros.estado
        }

        if(filtros.fechaDesde || filtros.fechaHasta){
            query.fecha = {}
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
                .populate({
                    path: "medico",
                    populate: {
                        path: "sedes"
                    }
                })
                .populate("pacientes")
                .populate("sedes")
                .skip(offset)
                .limit(limit),

                this.model.countDocuments(query)
        ])

        return {
            documents, 
            total
        }

    }

    async eliminarDisponiblesFuturos(idMedico, fechaHora){
        const query = {
            medico: idMedico
            fechaHora.$gte = fechaHora}

        
        return await Promise.all(
            this.model.
            .deleteMany(query)
            
        )


    }

}

