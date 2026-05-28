import { Turno } from "../domain/turno.js";
import { EstadoTurno } from "../domain/estadoTurno.js"
import {
    BadRequestError,
    TurnoNotFoundError,
    UnprocessableEntityError
} from "../errors/appError.js"
import { TurnoModel } from "../schemas/DBSchemas/turnoSchema.js";
import { reservarTurnoSchema } from "../schemas/requestsSchemas/turnoRequestSchemas.js";
import { domainMapper } from "../middlewares/domainMapper.js";


export class MongoTurnoRepository {
    constructor() {
        this.model = TurnoModel 
    }

            async save(turno) {
            const dto = domainMapper.domainTurnoToMongo(turno)

            let updated

            if (turno.id) {
                updated = await this.model.findOneAndUpdate(
                    { _id: turno.id },
                    dto,
                    { returnDocument: 'after' }
                )
            } else {
                updated = await this.model.create(dto)
            }

            return this.model.findById(updated._id)
                .populate("medico")
                .populate("paciente")
                .populate("sede")
        }


   async saveAll(turnos) {

        if (!Array.isArray(turnos)) {
            throw new Error("saveAll esperaba un array de turnos")
        }

        const limpios = turnos.filter(t => t != null)

        return await Promise.all(
            limpios.map(turno => this.save(turno))
        )
    }

    async findById(id){
        const mongoTurno = await this.model
            .findById(id)
            .populate({
                path: "medico",
                populate:
            [ 
                {
                    path: "usuario"
                },
                {
                    path: "sedes"
                }
            ]
            })
            .populate({
                path: "paciente",
                populate: 
                [
                    {
                        path: "usuario"
                    },
                    {
                        path: "obraSocial",
                        populate: {
                            path: "planes"
                        }
                    },
                    {
                        path: "plan"
                    }
                ]
            })
            .populate("sede")

        if(!mongoTurno){
            throw new TurnoNotFoundError(`El turno ${id} no fue encontrado`)
        }

        //console.dir(mongoTurno.toObject(), { depth: null })
      
        return mongoTurno
    }

    async findAll({ filtros = {}, paginacion = {} } = {}) {

        const query = {}

        if (filtros.pacienteId) {
            query.paciente = filtros.pacienteId
        }

        if (filtros.estado) {
            query.estado = filtros.estado
        }

        if (filtros.fechaDesde || filtros.fechaHasta) {
            query.fecha = {}
            if (filtros.fechaDesde) query.fecha.$gte = filtros.fechaDesde
            if (filtros.fechaHasta) query.fecha.$lte = filtros.fechaHasta
        }

        const page = paginacion.page ?? 1
        const limit = paginacion.limit ?? 10
        const offset = (page - 1) * limit

        const documents = await this.model
            .find(query)
            .populate({
                path: "medico",
                populate: ["usuario", "sedes"]
            })
            .populate({
                path: "paciente",
                populate: ["usuario", "obraSocial", "plan"]
            })
            .populate("sede")
            .skip(offset)
            .limit(limit)

        const total = await this.model.countDocuments(query)

        return {
            documents,
            total
        }
    }

    async eliminarDisponiblesFuturos(idMedico, fechaHora){
        const query = {
            medico: idMedico,
            estado: EstadoTurno.DISPONIBLE,
            fechaHora:{
                $gte: fechaHora
            }}

        
        return await this.model.deleteMany(query)
    }

    async existeTurnoEnFecha({
        idMedico,
        fecha,
        excluirTurnoId
    }){
        const query = {
            medico: idMedico,
            fechaHora: fecha,
            estado:{
                $in: ["CONFIRMADO", "RESERVADO"]
            }
        }

        if(excluirTurnoId){
            query._id = { $ne: excluirTurnoId}
        }

        const existe = await this.model.exists(query)

        return Boolean(existe)

    }

}

