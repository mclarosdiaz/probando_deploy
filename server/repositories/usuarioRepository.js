import { Usuario } from "../domain/usuario.js";
import {
    BadRequestError,
    TurnoNotFoundError,
    UnprocessableEntityError
} from "../errors/appError.js"
import { UsuarioModel } from "../schemas/DBSchemas/usuarioSchema.js";

export class MongoUsuarioRepository{
    constructor(){
        this.model = UsuarioModel
    }

    async save(usuario){
        const nuevoUsuario = new this.model(usuario)
        return await nuevoUsuario.save
    }

    async findById(id){
        return await this.model.findById(id)
    }

    async findAll(){
        return await this.model.find()
    }
}