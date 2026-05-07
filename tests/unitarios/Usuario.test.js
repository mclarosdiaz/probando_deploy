import { describe, expect, test } from "@jest/globals";
import { Usuario } from "../../server/domain/usuario.js";
import { CambioEstadoTurno } from "../../server/domain/cambioEstadoTurno.js";

describe("Usuario", () => {

    describe("Constructor", () =>{
        let usuario
        
        beforeEach(() => {
            usuario = new Usuario(22, "William", "Contraseña")
        })
        test ("Debe generar un usuario exitosamente", () =>{
expect(usuario).toMatchObject({
                id: 22, 
                nombreUsuario: "William",
                password: "Contraseña"
                
            })
        })

    })

})