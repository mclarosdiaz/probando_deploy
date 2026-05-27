import { Medico } from "../domain/medico.js";
import {
    BadRequestError,
    MedicoNotFoundError,
    TurnoNotFoundError,
    UnprocessableEntityError
} from "../errors/appError.js"
import { MedicoModel } from "../schemas/DBSchemas/medicoSchema.js";


export class MongoMedicoRepository{
    constructor(){
        this.model = MedicoModel
    }

    toDomain(mongoMedico){
        const data = mongoMedico.toObject()

        const medico = new Medico(
            data.usuario,
            data.matricula,
            data.nombre,
            data.especialidades,
            data.practicas,
            data.sedes,
        )

        medico.id = data.id

        return medico
    }

    async save(medico){
        const nuevoMedico = new this.model(medico)
        return await nuevoMedico.save
        
    }
    
    async findById(id){
        const mongoMedico = await this.model
        .findById(id)
        .populate("usuarios")
        .populate("sedes")

        if (!mongoMedico) {
            throw new MedicoNotFoundError(`El médico ${id} no fue encontrado`)
        }

        return mongoMedico
    }

    async findAll(){

        const documents = await Promise.all(this.find())

        const data = documents.map(doc => this.toDomain(doc))

        return data

    }
    
}



