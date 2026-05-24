import { Practica } from "./practica.js";
import { Turno } from "./turno.js";

export class CoberturaPractica {
    constructor(practica,nivel,porcentaje) {
        this.practica = practica;
        this.nivel = nivel;
        this.porcentaje = porcentaje.Math.max(porcentaje.Math.min(porcentaje, 100), 0);
    }

    costoAplicandoCobertura(turno){
        let costo = turno.costo

        if(turno.servicio === this.practica){
            costo -= turno.costo * (porcentaje/100)
        }

        return costo
    }

    
}