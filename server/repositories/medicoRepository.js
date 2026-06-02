import {MedicoNotFoundError} from "../errors/appError.js"
import { MedicoModel } from "../schemas/DBSchemas/medicoSchema.js";
import { medicoMapper } from "../middlewares/mappers/medicoMapper.js";


export class MongoMedicoRepository{
    
    constructor(){
        this.model = MedicoModel
    }


    async save(medico){
        const nuevoMedico = new this.model(medico)
        const medicoGuardado = await nuevoMedico.save()
        return medicoMapper.mongoMedicoToDomain(medicoGuardado)
        
    }
    
    async findById(id){
        const mongoMedico = await this.model
        .findById(id)

        if (!mongoMedico) {
            throw new MedicoNotFoundError(`El médico ${id} no fue encontrado`)
        }

        return medicoMapper.mongoMedicoToDomain(mongoMedico)
    }
    
    async findAll() {
        const medicosMongo = await this.model.find()

        return Promise.all(
            medicosMongo.map(m => medicoMapper.mongoMedicoToDomain(m))
        )
}



}