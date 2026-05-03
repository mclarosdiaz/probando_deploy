import { Notificacion } from "./notificacion";
import { Turno } from "./turno";
import { estrategiasNotificacion } from "./estrategiasNotificacion";

class FactoryNotificacion {
    
    constructor(estrategias){
        this.estrategias = estrategias
    }

    crearSegunEstadoTurno(turno) {   
        const estrategia = estrategiasNotificacion[turno.estado];
        if(!estrategia){
            throw new Error("No hay cambios en el turno para notificar");
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
