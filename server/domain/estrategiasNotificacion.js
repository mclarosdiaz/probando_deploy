export const estrategiasNotificacion = {
        // RESERVADO (ID: 2)
        2: (turno) => new Notificacion(
            turno.id,
            turno.destinatarioUltimoCambioEstado(), 
            turno.remitenteUltimoCambioEstado(), 
            `Se reservó un turno para ${turno.servicio}`
        ),

        // CONFIRMADO (ID: 3)
        3: (turno) => 
            new Notificacion(
            turno.id,
            turno.destinatarioUltimoCambioEstado(), 
            turno.remitenteUltimoCambioEstado(), 
            "Su turno ha sido confirmado."
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