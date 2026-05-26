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

    /*
    async findallPaginado({ filtros, paginacion } = {}){
        const query = this.obtenerFiltros(filtros)

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
    */

    async findAll({ filtros = {}, paginacion = {} } = {}) {
        
        const query = this.obtenerFiltros(filtros);

        // paginación con valores por defecto por si vienen vacíos
        const page = Number(paginacion.page) || 1;
        const limit = Number(paginacion.limit) || 10;
        
        //offset matemático
        // Ej: Si estoy en la página 2 y el límite es 10, salto los primeros 10.
        const offset = (page - 1) * limit;

        // 4. Ejecutamos ambas búsquedas a la vez (traer datos + contar el total) para que sea más rápido
        const [data, total] = await Promise.all([
            TurnoModel.find(query)
                .skip(offset)
                .limit(limit),
            TurnoModel.countDocuments(query)
        ]);

        return {
            data,
            total
        };
    }

    obtenerFiltros(filtros){
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

        if(filtros.profesional){
            query.profesional = filtros.profesional
        }

        if(filtros.especialidad){
            query.especialidad = filtros.especialidad
        }
    
        return query
    }

}

