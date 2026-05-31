import { Paciente } from "../domain/paciente.js";
import {
    BadRequestError,
    PacienteNotFoundError,
    UnprocessableEntityError
} from "../errors/appError.js"
import { PacienteModel } from "../schemas/DBSchemas/pacienteSchema.js";
import { pacienteMapper } from "../middlewares/mappers/pacienteMapper.js";


export class MongoPacienteRepository{
   
    constructor(){
        this.model= PacienteModel
    }

    async save(paciente){
        const nuevoPaciente= new this.model(paciente)
        const pacienteGuardado = await nuevoPaciente.save()
        return await pacienteMapper.mongoPacienteToDomain(pacienteGuardado)
    }

    async findById(id){
        const mongoPaciente = await this.model
            .findById(id)
    
        if (!mongoPaciente) {
            throw new PacienteNotFoundError(`El paciente ${id} no fue encontrado`)
        }

        return await pacienteMapper.mongoPacienteToDomain(mongoPaciente)
    }
}
