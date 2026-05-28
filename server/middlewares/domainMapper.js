import { Turno } from "../domain/turno.js"
import { Medico } from "../domain/medico.js"
import { Sede } from "../domain/sede.js"
import { Usuario } from "../domain/usuario.js"
import { Paciente } from "../domain/paciente.js"
import { ObraSocial } from "../domain/obraSocial.js"
import { Plan } from "../domain/plan.js"

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

    mongoMedicoToDomain(mongoMedico){


        const data = mongoMedico.toObject
            ? mongoMedico.toObject()
            : mongoMedico

        const medico = new Medico(
            this.mongoUsuarioToDomain(data.usuario),
            data.matricula,
            data.nombre,
            data.disponibilidades,
            data.practicas,
            data.sedes.map(
                sede => this.mongoSedeToDomain(sede)
            )
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

        return paciente
    }

    mongoObraSocialToDomain(mongoObraSocial){
        const data = mongoObraSocial.toObject
            ? mongoObraSocial.toObject()
            : mongoObraSocial

        const obraSocial = new ObraSocial(
            data.nombre,
            data.planes.map(plan => this.mongoPlanToDomain(plan))
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
}

export const domainMapper = new DomainMapper()