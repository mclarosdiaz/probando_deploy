import { horaAMinutos } from "./fecha.js";

export class DisponibilidadHoraria {
    constructor(diaSemana, horaDesde, horaHasta) {
        this.diaSemana = diaSemana;
        this.horaDesde = horaDesde;
        this.horaHasta = horaHasta;
    }

    validarSesion(servicio){
        const duracionDisponibilidad = horaAMinutos(this.horaHasta - this.horaDesde);
        return duracionDisponibilidad >= servicio.duracionTurnoEnMins;
    }
    
}
