import { EstadoTurno } from "../domain/estadoTurno.js"
import {
    TurnoNotFoundError,
} from "../errors/appError.js"
import { TurnoModel } from "../schemas/DBSchemas/turnoSchema.js";
import { turnoMapper } from "../middlewares/mappers/turnoMapper.js";
import mongoose from "mongoose";

export class MongoTurnoRepository {

    constructor() {
        this.model = TurnoModel 
    }

    async save(turno) {
        let updated

        if (turno.id) {
            updated = await this.model.findOneAndUpdate(
                { _id: turno.id },
                turnoMapper.turnoToMongo(turno),
                { returnDocument: 'after' }
            )
        } else {
            updated = await this.model.create(turno)
        }        

        const mongoTurno = await this.model.findById(updated._id)

        return turnoMapper.mongoTurnoToDomain(mongoTurno)
            
    }


    async saveAll(turnos) {

        if (!Array.isArray(turnos)) {
            throw new Error("saveAll esperaba un array de turnos")
        }

        const limpios = turnos.filter(t => t != null)

        const guardados = await Promise.all(
            limpios.map(turno => this.save(turno))
        )

        return guardados
    }

    async findById(id){
        const mongoTurno = await this.model
            .findById(id)
        
        if(!mongoTurno){
            throw new TurnoNotFoundError(`El turno ${id} no fue encontrado`)
        }

        return turnoMapper.mongoTurnoToDomain(mongoTurno)
    }

    async findAll({ filtros = {}, page, limit } = {}) {

        const query = {}

        if (filtros.pacienteId) {
            //query.paciente = filtros.pacienteId
            query.paciente = new mongoose.Types.ObjectId(filtros.pacienteId)
        }

        if (filtros.estado) {
            query.estado = filtros.estado
        }

        if (filtros.fechaDesde || filtros.fechaHasta) {
            query.fechaHora = {}
            if (filtros.fechaDesde) query.fechaHora.$gte = new Date(filtros.fechaDesde)
            if (filtros.fechaHasta) query.fechaHora.$lte = new Date(filtros.fechaHasta)
        }

        const offset = (page - 1) * limit

        let documents = await this.model
            .find(query)
            .skip(offset)
            .limit(limit)
        

        const turnos = await Promise.all(documents.map(mongoTurno => turnoMapper.mongoTurnoToDomain(mongoTurno)))

        const total = await this.model.countDocuments(query)
        return {
            turnos,
            total
        }
    }

    async buscarTurnosDisponibles( filtros = {} ){
        
        const {
            nombreMedico,
            nombreEspecialidad,
            nombrePractica,
            nombreSede,
            fechaDesde,
            fechaHasta
        } = filtros

        const matchTurno = {
            estado: "DISPONIBLE"
        }

        if(fechaDesde || fechaHasta){
            matchTurno.fechaHora = {}

            if(fechaDesde){
                matchTurno.fechaHora.$gte = new Date(fechaDesde)
            }

            if(fechaHasta){
                matchTurno.fechaHora.$lte = new Date(fechaHasta)
            }
        }

        if(nombrePractica){
            matchTurno["servicio.practica.nombre"] = {
                $regex: nombrePractica,
                $options: "i"
            }
        }

        if(nombreEspecialidad){
            matchTurno["servicio.especialidad.nombre"] = {
                $regex: nombreEspecialidad,
                $options: "i"
            }
        }

        const pipeline = [

            {
                $match: matchTurno
            },

            {
                $lookup: {
                    from: "medicos",
                    localField: "medico",
                    foreignField: "_id",
                    as: "medico"
                }
            },
            {
                $unwind: "$medico"
            },

            {
                $lookup: {
                    from: "sedes",
                    localField: "sede",
                    foreignField: "_id",
                    as: "sede"
                }
            }, 
            {
                $unwind: "$sede"
            }

        ]

        if(nombreMedico){
            pipeline.push({
                $match: {
                    "medico.nombre": {
                        $regex: nombreMedico,
                        $options: "i"
                    }
                }
            })
        }

        if(nombreSede){
            pipeline.push({
                $match: {
                    "sede.nombre": {
                        $regex: nombreSede,
                        $options: "i"
                    }
                }
            })
        }

        return await this.model.aggregate(pipeline)

    }

    async eliminarDisponiblesFuturos(idMedico, fechaHora){
        const query = {
            medico: idMedico,
            estado: EstadoTurno.DISPONIBLE,
            fechaHora:{
                $gte: fechaHora
            }}

       // const borrados = await this.model.deleteMany(query)     
        const borrados = await this.model.find(query)
        await this.model.deleteMany(query)
        return Promise.all(borrados.map(mongoTurno => turnoMapper.mongoTurnoToDomain(mongoTurno)))
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

