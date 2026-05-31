import { Sede } from "../domain/sede.js";
import {
    BadRequestError,
    TurnoNotFoundError,
    UnprocessableEntityError
} from "../errors/appError.js"
import { SedeModel } from "../schemas/DBSchemas/sedeSchema.js";
import { sedeMapper } from "../middlewares/mappers/sedeMapper.js";

export class MongoSedeRepository{

    constructor(){
        this.model = SedeModel
    }

    async save(sede){
        const nuevaSede = new this.model(sede)
        const mongoSedeGuardada = await nuevaSede.save()

        return sedeMapper.mongoSedeToDomain(mongoSedeGuardada)
    }

    async findById(id){
        const mongoSede = await this.model.findById(id)
        return sedeMapper.mongoSedeToDomain(mongoSede)
    }

    async findAll(){
        const mongoSedes = await this.model.find({eliminado: false}) 
        return mongoSedes.map(mongoSede => sedeMapper.mongoSedeToDomain(mongoSede))
    }
}