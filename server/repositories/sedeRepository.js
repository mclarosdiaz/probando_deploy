import { Turno } from "../domain/sede.js";
import {
    BadRequestError,
    TurnoNotFoundError,
    UnprocessableEntityError
} from "../errors/appError.js"
import { SedeModel } from "../schemas/DBSchemas/sedeSchema.js";

export class MongoMedicoRepository{
    cosntructor(){
        this.model = SedeModel
    }

    async save(sede){
        const nuevaSede = new this.model(sede)
        return await nuevaSede.save
    }

    async findById(id){
        return await this.model.findById(id)
    }

    async findAll(){
        return await this.model.find({eliminado: false}) 
    }
}