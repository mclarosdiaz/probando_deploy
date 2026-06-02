import { CoberturaEspecialidad } from "./coberturaEspecialidad.js";
import { CoberturaPractica } from "./coberturaPractica.js";
import { NivelCobertura } from "./nivelCobertura.js"

export class Plan{
    id
    nombre
    coberturasEspecialidad
    coberturasPractica
    
    
    constructor(nombre, coberturasEspecialidad, coberturasPractica){
        this.nombre = nombre;
        this.coberturasEspecialidad = coberturasEspecialidad;
        this.coberturasPractica = coberturasPractica;
    }

    obtenerCoberturaEspecialidad(especialidad){
        const cobertura = this.coberturasEspecialidad
            .find(c => c.especialidad.id === especialidad.id)

        return cobertura
    }

    obtenerCoberturaPractica(practica){
        
        const cobertura = this.coberturasPractica
            .find(c => c.practica.id === practica.id)

        return cobertura
    }



}