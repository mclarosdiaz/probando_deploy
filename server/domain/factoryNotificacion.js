import { Notificacion } from "./notificacion";
import { Turno } from "./turno";


export class FactoryNotificacion {
    
    static estrategias = {
        // RESERVADO (ID: 2)
        2: (turno) => new Notificacion(
            turno.id,
            turno.medico.usuario, 
            turno.paciente.usuario, 
            `El paciente ${turno.paciente.nombre} reservó un turno para ${turno.practica}`
        ),

        // CONFIRMADO (ID: 3)
        3: (turno) => 
            new Notificacion(
            turno.id,
            turno.paciente.usuario, 
            turno.medico.usuario, 
            `Su turno con el Dr/a.  ${turno.medico.nombre}  ha sido confirmado.`
        ),

        // CANCELADO (ID: 4)
        4: (turno) => {
            return new Notificacion(
                turno.id,
                turno.destinatarioUltimoCambioEstado(), 
                turno.remitenteUltimoCambioEstado(), 
                "El turno ha sido cancelado por la contraparte."
            );
        }


    }
    
    static crearSegunEstadoTurno(turno) {   
        const estrategia = this.estrategias[turno.estado];
        if(!estrategia){
            throw new Error("No hay cambios en el turno para notificar");
        }

        return estrategia(turno)
    }
    
    
    static crearRecordatorio(turno) {
        const mensajeBase = `Recordatorio: Mañana tiene un turno agendado a las ${turno.fechaHora.toLocaleTimeString()}`;

        return [
            new Notificacion(turno.id,turno.paciente.usuario, "SISTEMA", mensajeBase),
            new Notificacion(turno.id,turno.medico.usuario, "SISTEMA", mensajeBase)

            //TODO emisor Notificacion
        ];
    }
    
}

