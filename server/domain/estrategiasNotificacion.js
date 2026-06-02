import { Turno } from "./turno.js";
import { Notificacion } from "./notificacion.js";

export const estrategiasNotificacion = {
        // RESERVADO (ID: 2)
        RESERVADO: (turno) => new Notificacion(
            turno.id,
            turno.destinatarioUltimoCambioEstado(), 
            turno.remitenteUltimoCambioEstado(), 
            `Se reservó un turno para ${turno.servicio.nombre}`
        ),

        // CONFIRMADO (ID: 3)
        CONFIRMADO: (turno) => 
            new Notificacion(
            turno.id,
            turno.destinatarioUltimoCambioEstado(), 
            turno.remitenteUltimoCambioEstado(), 
            "Su turno ha sido confirmado."
        ),

        // CANCELADO (ID: 4)
        CANCELADO: (turno) => {
            return new Notificacion(
                turno.id,
                turno.destinatarioUltimoCambioEstado(), 
                turno.remitenteUltimoCambioEstado(), 
                "El turno ha sido cancelado por la contraparte."
            );
        }


    }