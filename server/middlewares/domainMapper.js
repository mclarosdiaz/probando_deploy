import { Turno } from "../domain/turno.js"
import { Medico } from "../domain/medico.js"
import { Sede } from "../domain/sede.js"
import { Usuario } from "../domain/usuario.js"
import { Paciente } from "../domain/paciente.js"
import { ObraSocial } from "../domain/obraSocial.js"
import { Plan } from "../domain/plan.js"
import { Notificacion } from "../domain/notificacion.js"

class DomainMapper{
    mongoTurnoToDomain(mongoTurno){
        const data = mongoTurno.toObject()

        const medico = this.mongoMedicoToDomain(data.medico)
        const paciente = data.paciente
            ? this.mongoPacienteToDomain(data.paciente)
            : null

        const turno = new Turno(
            medico,
            data.fechaHora,
            data.sede,
            data.estado,
            data.costo
        )
        turno.id = data._id.toString()


        turno.paciente = paciente
        turno.historialEstados = data.historialEstados

        return turno
    }

    mongoMedicoToDomain(data) {

        const medico = new Medico(
            this.mongoUsuarioToDomain(data.usuario),
            data.matricula,
            data.nombre,
            data.especialidades ?? [],
            data.practicas ?? [],
            (data.sedes ?? []).map(s => this.mongoSedeToDomain(s)),
            data.disponibilidades ?? []
        )

        medico.id = data._id.toString()

        return medico
    }

    mongoSedeToDomain(mongoSede){
        const data = mongoSede.toObject()

        const sede = new Sede(
            data.nombre,
            data.direccion
        )
        sede.id = data._id.toString()

        return sede
    }

    mongoUsuarioToDomain(mongoUsuario){
        const data = mongoUsuario.toObject
            ? mongoUsuario.toObject()
            : mongoUsuario

        const usuario = new Usuario(
            data.nombreUsuario,
            data.password
        )

        usuario.id = data._id.toString()

        return usuario
    }

    mongoPacienteToDomain(mongoPaciente) {
        const data = mongoPaciente.toObject
            ? mongoPaciente.toObject()
            : mongoPaciente 

        const paciente = new Paciente(
            this.mongoUsuarioToDomain(data.usuario),
            data.dni,
            data.nombre,
            this.mongoObraSocialToDomain(data.obraSocial),
            this.mongoPlanToDomain(data.plan)
        )
        paciente.id = data._id.toString()
        console.log("PACIENTE RAW:", mongoPaciente)
        console.log("OBRA SOCIAL:", mongoPaciente.obraSocial)
        console.log("PLANES:", mongoPaciente.obraSocial?.planes)
        return paciente
    }

    mongoObraSocialToDomain(mongoObraSocial) {
    const data = mongoObraSocial.toObject
        ? mongoObraSocial.toObject()
        : mongoObraSocial

    const obraSocial = new ObraSocial(
        data.nombre,
        Array.isArray(data.planes)
            ? data.planes.map(plan => this.mongoPlanToDomain(plan))
            : []
    )

    obraSocial.id = data._id.toString()

    return obraSocial
    }

    mongoPlanToDomain(mongoPlan){
        const data = mongoPlan.toObject
            ? mongoPlan.toObject()
            : mongoPlan

        const plan = new Plan(
            data.nombre,
            data.coberturasEspecialidad,
            data.coberturasPractica
        )

        plan.id = data._id.toString()

        return plan
    }
    domainTurnoToMongo(turno) {
    return {
        medico: turno.medico.id,
        paciente: turno.paciente?.id ?? null,
        sede: turno.sede?.id,
        fechaHora: turno.fechaHora,
        estado: turno.estado,
        costo: turno.costo,
        historialEstados: turno.historialEstados?.map(h => ({
            ...h,
            usuario: h.usuario?.id ?? h.usuario
        }))
    }
}
        mongoNotificacionToDomain(mongoNotificacion) {
        const data = mongoNotificacion.toObject
            ? mongoNotificacion.toObject()
            : mongoNotificacion

        const notificacion = new Notificacion(
            data._id?.toString(),
            data.destinatario,
            data.remitente,
            data.mensaje
        )

        notificacion.fechaHoraCreacion = data.fechaHoraCreacion
        notificacion.fechaHoraLeida = data.fechaHoraLeida
        notificacion.leida = data.leida

        return notificacion
    }

}

export const domainMapper = new DomainMapper()