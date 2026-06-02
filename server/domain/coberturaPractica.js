import { Practica } from "./practica.js";
import { Turno } from "./turno.js";

export class CoberturaPractica {
    constructor(practica,nivel,porcentaje) {
        this.practica = practica;
        this.nivel = nivel;
        this.porcentaje = Math.max(Math.min(porcentaje, 100), 0);
    }

}