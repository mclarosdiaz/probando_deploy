import { Paciente } from "../domain/paciente.js";
import {
    BadRequestError,
    PacienteNotFoundError,
    UnprocessableEntityError
} from "../errors/appError.js"


export class PacienteRepository{
    save(paciente) {
        throw new Error("Not implemented");
    }

    findById(id) {
        throw new Error("Not implemented");
    }

    findAll() {
        throw new Error("Not implemented");
    }
}