import { UsuarioModel } from "../schemas/DBSchemas/usuarioSchema.js";
import { usuarioMapper } from "../middlewares/mappers/usuarioMapper.js";

export class MongoUsuarioRepository{

    constructor(){
        this.model = UsuarioModel
    }

    async save(usuario){
        const nuevoUsuario = new this.model(usuario)
        
        const mongoUsuarioGuardado = await nuevoUsuario.save()
        return usuarioMapper.mongoUsuarioToDomain(mongoUsuarioGuardado)
    }

    async findById(id){
        const mongoUsuario = await this.model.findById(id)
        return usuarioMapper.mongoUsuarioToDomain(mongoUsuario)
    }

    async findAll(){
        const mongoUsuarios =  await this.model.find()
        return mongoUsuarios.map(mongoUsuario => usuarioMapper.mongoUsuarioToDomain(mongoUsuario))
    }
}