import { Notificacion } from "./notificacion.js";
import { Turno } from "./turno.js";
import { estrategiasNotificacion } from "./estrategiasNotificacion.js";

class FactoryNotificacion {
    
    constructor(estrategias){
        this.estrategias = estrategias
    }

    crearSegunEstadoTurno(turno) {   
        const estrategia = estrategiasNotificacion[turno.estado];
        if(!estrategia){
            return null
        }

        return estrategia(turno)
    }
    
    
    static crearRecordatorio(turno) {
        const mensajeBase = `Recordatorio: Mañana tiene un turno agendado a las ${turno.fechaHora.toLocaleTimeString()}`;

        return [
            new Notificacion(turno.id, turno.paciente.usuario, turno.paciente.usuario, mensajeBase),
            new Notificacion(turno.id,turno.medico.usuario, turno.medico.usuario, mensajeBase)

            //TODO emisor Notificacion
        ];
    }
    
}

export const factoryNotificacion = new FactoryNotificacion(estrategiasNotificacion)
