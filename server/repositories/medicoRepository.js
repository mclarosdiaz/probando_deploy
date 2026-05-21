import { Medico } from "../domain/medico.js";
import {
    BadRequestError,
    TurnoNotFoundError,
    UnprocessableEntityError
} from "../errors/appError.js"
import { MedicoModel } from "../schemas/DBSchemas/medicoSchema.js";


export class MongoMedicoRepository{
    constructor(){
        this.model = MedicoModel
    }

    async save(medico){
        const nuevoMedico = new this.model(medico)
        return await nuevoMedico.save
        
    }
    
    async findById(id){
        return await this.model.findById(id)
    }

    async findAll(){
        return await this.model.find({eliminado: false}) 
    }
}



