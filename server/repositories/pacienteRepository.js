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
        return await nuevoPaciente.save
    }

    async findById(id){
        const mongoPaciente = this
        .findById(id)
        .populate("usuarios")
        .populate({
            path: "obras_sociales",
            populate:{
                path: "planes"
            }
        })
        .populate("planes")

        if (!mongoPaciente) {
            throw new TurnoNotFoundError(`El paciente ${id} no fue encontrado`)
        }

        return mongoPaciente
    }
}
