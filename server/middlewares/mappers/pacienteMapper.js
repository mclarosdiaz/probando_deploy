import { Paciente } from "../../domain/paciente"
import { ObraSocial } from "../../domain/obraSocial.js"
import { MongoUsuarioRepository } from "../../repositories/usuarioRepository.js"
import { planMapper } from "./planMapper.js"
import { usuarioMapper } from "./usuarioMapper.js"

class PacienteMapper{
    constructor(usuarioRepository, usuarioMapper, planMapper){
        this.usuarioRepository = usuarioRepository
        this.usuarioMapper = usuarioMapper
        this.planMapper = planMapper
    }

    async mongoPacienteToDomain(data){
        const usuario = await this.usuarioRepository.findById(data.usuario)

        const planesObraSocial = data.obraSocial?.planes ? 
            await Promise.all(data.obraSocial.planes.map(async (mongoPlan) => {
                return await this.planMapper.mongoPlanToDomain(mongoPlan)
            })) 
            : []

        const obraSocial = new ObraSocial(
            data.obraSocial.id,
            data.obraSocial.nombre,
            planesObraSocial
        )

        const plan = await this.planMapper.mongoPlanToDomain(data.plan)

        const paciente = new Paciente(
            usuario,
            data.dni,
            data.nombre,
            obraSocial,
            plan
        )

        paciente.id = data._id.toString()

        return paciente
    }

    pacienteToDTO(paciente){
        return{
            id: paciente.id,
            dni: paciente.dni,
            nombre: paciente.nombre,
            obraSocial: paciente.obraSocial.nombre,
            plan: paciente.plan.nombre
        }
    }
}
const usuarioRepository = new MongoUsuarioRepository()

export const pacienteMapper = new PacienteMapper(usuarioRepository, usuarioMapper, planMapper)