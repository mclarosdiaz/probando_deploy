import { Turno } from "./turno.js";
import { Usuario } from "./usuario.js";
import { EstadoTurno } from "./estadoTurno.js";

export class CambioEstadoTurno{
    constructor(fechaHoraIngreso, estado, turno, usuario, motivo){
        this.fechaHoraIngreso = fechaHoraIngreso;
        this.estado = estadoTurno;
        this.turno = turno;
        this.usuario = usuario;
        this.motivo = motivo;
    }
}