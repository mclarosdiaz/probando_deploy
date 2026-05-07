import { ESLint } from "eslint";
import { EstadoTurno } from "./estadoTurno";
import { Notificacion } from "./notificacion";

export const estrategiasNotificacion = {

        RESERVADO: (turno) => 
            new Notificacion(
            turno.id,
            turno.medico.usuario, 
            turno.paciente.usuario, 
            `El paciente ${turno.paciente.nombre} reservó un turno para ${turno.practica}`
        ),

        
        CONFIRMADO: (turno) => 
            new Notificacion(
            turno.id,
            turno.paciente.usuario, 
            turno.medico.usuario, 
            `Su turno con el Dr/a.  ${turno.medico.nombre}  ha sido confirmado.`
        ),

        CANCELADO: (turno) => {
            return new Notificacion(
                turno.id,
                turno.destinatarioUltimoCambioEstado(), 
                turno.remitenteUltimoCambioEstado(), 
                "El turno ha sido cancelado por la contraparte."
            );
        }


    }