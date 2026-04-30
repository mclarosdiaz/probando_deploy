import { CoberturaEspecialidad } from "./coberturaEspecialidad";
import { CoberturaPractica } from "./coberturaPractica";
import { NivelCobertura } from "./nivelCobertura"

export class Plan{
    constructor(id, nombre, coberturasEspecialidad, coberturasPractica){
        this.id = id;
        this.nombre = nombre;
        this.coberturasEspecialidad = coberturasEspecialidad;
        this.coberturasPractica = coberturasPractica;
    }

    obtenerCoberturaEspecialidad(entidad){
        const cobertura =
            this.coberturasEspecialidad.find(c => c.especialidad.id === entidad.id) ||
            this.coberturasPractica.find(c => c.practica.id === entidad.id);
        
        return cobertura ? cobertura.nivel : NivelCobertura["NO CUBIERTO"];
    }

    obtenerCoberturaPractica(practica){

    }
}