export class CambioEstadoTurno{
    constructor(fechaHoraIngreso, estadoTurno, idTurno, usuario, motivo){
        this.fechaHoraIngreso = fechaHoraIngreso;
        this.estado = estadoTurno;
        this.idTurno = idTurno;
        this.usuario = usuario;
        this.motivo = motivo;
    }

    toJSON(){
        return{
            estadoAnterior: this.estado,
            fecha: this.fechaHoraIngreso
        }
    }
}