import { describe, expect, test, beforeEach } from "@jest/globals";
import { Notificacion } from "../../server/domain/notificacion.js";
import { Usuario } from "../../server/domain/usuario.js";

describe("Notificacion",()=>{
    let usuario1
    beforeEach(()=>{
        usuario1 = new Usuario("1234", "pizzaBirraYFaso", "123abc")
        usuario2 = new Usuario("123", "JEJESALU3", "abc123")
    })
    

    test("Se deberia poder marcar como leida una notificacion",()=>{
        let notificacion = new Notificacion(123,usuario1,usuario2,"TEST")
        notificacion.marcarComoLeida()

        expect(notificacion.leida).toBeTruthy()
    })
})