import { Medico } from "./medico";
import { Paciente } from "./paciente"
import { Sede } from "./sede"
import { Practica } from "./practica"
import { EstadoTurno } from "./estadoTurno"
import { CambioEstadoTurno } from "./cambioEstadoTurno";
import { FactoryNotificacion } from "./factoryNotificacion";

export class Turno {
    static numeroTurno = 0

    constructor(medico, fechaHora, sede, estado, costo) {
        this.id = Turno.generarId()
        this.medico = medico, 
        this.fechaHora = fechaHora,
        this.sede = sede, 
        this.estado = estado,
        this.historialEstados = [],
        this.costo = costo
    }

    actualizarEstado(nuevoEstado, usuario, motivo){
        this.estado = nuevoEstado 
        
        const cambioEstado = new CambioEstadoTurno(new Date()
        , nuevoEstado
        , this
        , usuario
        , motivo) 
        
        this.historialEstados.push(cambioEstado)

        FactoryNotificacion.crearSegunEstadoTurno(this)
        //  TODO ¿Dónde guardamos las notificaciones?   
    }

    asignarPaciente(paciente){
        this.paciente = paciente
    }

    asignarPractica(practica){
        this.practica = practica
    }

    asignarEspecialidad(especialidad){
        this.especialidad = especialidad
    }

    static generarId(){ //método de clase (usa una variable a la que pueden acceder todas las instancias)
        this.numeroTurno = this.numeroTurno + 1
        return this.numeroTurno
    }
    
    remitenteUltimoCambioEstado(){
        indiceUltimoCambio = this.historialEstados.length - 1
        ultimoCambioDeEstado = this.historialEstados[indiceUltimoCambio]
        return ultimoCambioDeEstado.usuario
    }

    destinatarioUltimoCambioEstado(){
        destinatario = this.paciente
        if (this.remitenteUltimoCambioEstado() === this.paciente){
            destinatario = this.medico
        }
        return destinatario.usuario
    }

}
