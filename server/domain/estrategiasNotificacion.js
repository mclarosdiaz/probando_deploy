export const estrategiasNotificacion = {
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