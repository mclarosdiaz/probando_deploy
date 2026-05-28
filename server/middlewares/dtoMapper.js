import { Turno } from "../domain/turno.js";
import { Notificacion } from "../domain/notificacion.js";
import { Usuario } from "../domain/usuario.js";
import { Medico } from "../domain/medico.js";

class DTOMapper{
    turnoToDTO(turno){
        const servicioAsignado = turno.getServicio()

        return{
            id: turno.id,
            fechaHora: turno.fechaHora,
            estado: turno.estado,
            costo: turno.costo,
            medico:{
                id: turno.medico.id,
                nombre: turno.medico.nombre
            },
            paciente: {
                id: turno.paciente.id,
                nombre: turno.paciente.nombre
            },
            sede: {
                id: turno.sede.id,
                nombre: turno.sede.nombre
            },
            servicio: {
                nombre: servicioAsignado.nombre,
                duracionTurnoEnMins: servicioAsignado.duracionTurnoEnMins
            }
        }
    }

    notificacionToDTO(notificacion) {
        if (!notificacion) return null

        return {
            id: notificacion.id,
            destinatario: notificacion.destinatario?.id ?? notificacion.destinatario,
            remitente: notificacion.remitente?.id ?? notificacion.remitente,
            mensaje: notificacion.mensaje,
            fechaHoraCreacion: notificacion.fechaHoraCreacion?.toISOString?.(),
            fechaHoraLeida: notificacion.fechaHoraLeida
                ? notificacion.fechaHoraLeida.toISOString()
                : null,
            leida: notificacion.leida
        }
    }

    medicoToDTO(medico){
        return{
            id: medico.id,
            Usuario: medico.usuario,
            matricula: medico.matricula,
            nombre: medico.nombre,
            especialidades: medico.especialidades,
            practicas: medico.practicas,
            sedes: medico.sedes,
            disponibilidades: medico.disponibilidades
        }
    }
    
}

export const dtoMapper = new DTOMapper()