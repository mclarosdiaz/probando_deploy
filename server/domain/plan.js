import { CoberturaEspecialidad } from "./coberturaEspecialidad.js";
import { CoberturaPractica } from "./coberturaPractica.js";
import { NivelCobertura } from "./nivelCobertura.js"

export class Plan{
    constructor(id, nombre, coberturasEspecialidad, coberturasPractica){
        this.id = id;
        this.nombre = nombre;
        this.coberturasEspecialidad = coberturasEspecialidad;
        this.coberturasPractica = coberturasPractica;
    }

    

    obtenerCoberturaEspecialidad(especialidad){
        const cobertura = this.coberturasEspecialidad
            .find(c => c.especialidad.id === especialidad.id)

        return cobertura ? cobertura.nivel : NivelCobertura["NO CUBIERTO"];
    }

    obtenerCoberturaPractica(practica){
        const cobertura = this.coberturasPractica
            .find(c => c.practica.id === practica.id)

        return cobertura ? cobertura.nivel : NivelCobertura["NO CUBIERTO"]
    }
}