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

    static generarId(){ //método de clase (usa una variable a la que pueden acceder todas las instancias)
        this.numeroTurno = this.numeroTurno + 1
        return this.numeroTurno
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
        this.servicio = practica
    }

    asignarEspecialidad(especialidad){
        this.servicio = especialidad
    }
    
    modificarFecha(fecha){
        this.fechaHora = fecha
    }

    puedeModificar(usuarioId){
        return this.esPaciente(usuarioId) ||
            this.esMedico(usuarioId)
    }

    esPaciente(usuarioId){
        return this.paciente.usuario.id === usuarioId
    }

    esMedico(usuarioId){
        return this.medico.usuario.id === usuarioId
    }

    
    remitenteUltimoCambioEstado(){
        const ultimo = this.historialEstados.at(-1)

        return ultimo.usuario
    }

    destinatarioUltimoCambioEstado(){
        const id = this.remitenteUltimoCambioEstado().id

        if(this.esPaciente(id)) return this.medico.usuario
        if(this.esMedico(id)) return this.paciente.usuario

        
        throw new Error("Usuario inválido para este turno")
    }

    puedeCancelarse(){
        if(
            this.estado === EstadoTurno.CANCELADO ||
            this.estado === EstadoTurno.REALIZADO
        ){
            return false
        }

        const ahora = new Date()
        const fechaTurno = new Date(this.fecha)

        const diferenciaMs = fechaTurno - ahora
        const unaHoraMs = 60 * 60 * 1000

        return diferenciaMs >= unaHoraMs
    }

    obtenerUsuario(idUsuario){
        let usuario = null
        if(this.paciente && this.paciente.usuario.id === idUsuario){
            usuario = this.paciente.usuario
        } else if(this.medico && this.medico.usuario.id === idUsuario){
            usuario = this.medico.usuario
        }

        return usuario
    }

    obtenerUsuarioMedico(){
        return this.medico.usuario
    }

    solicitarCambioFecha(fecha, usuario, motivo){
        this.fechaHoraPropuesta = fecha
        this.actualizarEstado(
            this.estado.RESERVADO,
            usuario, 
            motivo
        )
    }

    confirmarCambioFecha(usuario){
        this.fechaHora = this.fechaHoraPropuesta
        this.fechaHoraPropuesta = null

        this.actualizarEstado(
            EstadoTurno.CONFIRMADO, 
            usuario,
            "Cambio de fecha confirmado"
        )
    }

    rechazarCambioFecha(usuario){
        this.fechaHoraPropuesta = null

        this.actualizarEstado(
            EstadoTurno.CONFIRMADO,
            usuario,
            "Cambio de fecha rechazado"
        )
    }

    sePuedeCancelar(fecha){
        return (this.fechaHora - fecha) >= 3600000 //una hora en milisegundos
    }
    
}
