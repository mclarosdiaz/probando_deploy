import { Notificacion } from "./notificacion.js";
import { estrategiasNotificacion } from "./estrategiasNotificacion.js";

class FactoryNotificacion {
    
    constructor(){
        this.estrategias = estrategiasNotificacion
    }

    crearSegunEstadoTurno(turno) {   
        const estrategia = estrategiasNotificacion[turno.estado];
        if(!estrategia){
           throw new Error("No hay cambios en el turno para notificar")
        }

        return estrategia(turno)
    }
    
    //habia un static aca
     crearRecordatorio(turno) {
        const mensajeBase = `Recordatorio: Mañana tiene un turno agendado a las ${turno.fechaHora.toLocaleTimeString()}`;

        return [
            new Notificacion(turno.id, turno.paciente.usuario, turno.paciente.usuario, mensajeBase),
            new Notificacion(turno.id,turno.medico.usuario, turno.medico.usuario, mensajeBase)

        ];
    }
    
}

export const factoryNotificacion = new FactoryNotificacion()
