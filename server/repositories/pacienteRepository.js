import { Paciente } from "../domain/paciente.js";
import {
    BadRequestError,
    PacienteNotFoundError,
    UnprocessableEntityError
} from "../errors/appError.js"
import { PacienteModel } from "../schemas/DBSchemas/pacienteSchema.js";

export class MongoPacienteRepository{
    constructor(){
        this.model= PacienteModel
    }

    async save(paciente){
        const nuevoPaciente= new this.model(paciente)
        return await nuevoPaciente.save()
    }

    async findById(id){
        const mongoPaciente = await this.model
        .findById(id)
        .populate([
            {
                path: "usuario"
            },
            {
                path: "obraSocial",
                populate:{
                    path:"planes"
                }
            },
            {
                path: "plan"
            }
        ])

    
        if (!mongoPaciente) {
            throw new PacienteNotFoundError(`El paciente ${id} no fue encontrado`)
        }

        return mongoPaciente
    }
}
