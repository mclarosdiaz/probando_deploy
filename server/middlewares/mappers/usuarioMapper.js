import { Usuario } from "../../domain/usuario.js"
class UsuarioMapper{
    

    mongoUsuarioToDomain(data){
        
        const nombreUsuario = data.nombreUsuario
        const password = data.password

        const usuario= new Usuario(
            nombreUsuario,
            password
        )
        usuario.id = data._id.toString()
        return usuario
    }

    usuarioToDto(usuario){
        return{
            id: usuario.id,
            nombreUsuario : usuario.nombreUsuario,
            password : usuario.password
        }
    }
}

export const usuarioMapper = new UsuarioMapper()