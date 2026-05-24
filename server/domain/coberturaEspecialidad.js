import { Especialidad } from "./especialidad.js";
import { Turno } from "./turno.js";

export class CoberturaEspecialidad {
    constructor(especialidad,nivel, porcentaje) {
        this.especialidad = especialidad;
        this.nivel = nivel;
        this.porcentaje = porcentaje.Math.max(porcentaje.Math.min(porcentaje, 100), 0);
    }

        costoAplicandoCobertura(turno){
        let costo = turno.costo

        if(turno.servicio === this.especialidad){
            costo -= turno.costo * (porcentaje/100)
        }
        
        return costo
    }
}