import { DisponibilidadHoraria } from "../../domain/disponibilidadHoraria.js"
import { Medico } from "../../domain/medico.js"
import { MongoSedeRepository } from "../../repositories/sedeRepository.js"
import { MongoUsuarioRepository } from "../../repositories/usuarioRepository.js"
import { sedeMapper } from "./sedeMapper.js"
import { usuarioMapper } from "./usuarioMapper.js"
import { especialidadMapper } from "./especialidadMapper.js"
import { practicaMapper } from "./practicaMapper.js"

class MedicoMapper{
    constructor(usuarioRepository, usuarioMapper, sedeRepository, sedeMapper, especialidadMapper, practicaMapper){
        this.usuarioRepository = usuarioRepository
        this.usuarioMapper = usuarioMapper
        this.sedeRepository = sedeRepository
        this.sedeMapper = sedeMapper
        this.especialidadMapper = especialidadMapper
        this.practicaMapper = practicaMapper
    }

    async mongoMedicoToDomain(data) {
        const usuario = await this.usuarioRepository.findById(data.usuario)    
        
        const sedesMongo = await Promise.all(
            data.sedes.map(sedeId => 
                this.sedeRepository.findById(sedeId)
            )
        ) 

        const sedes = sedesMongo.map(sedeMongo => 
            this.sedeMapper.mongoSedeToDomain(sedeMongo))

        const especialidades =  data.especialidades
            .map(especialidadMongo => 
                this.especialidadMapper.mongoEspecialidadToDomain(especialidadMongo))

       const practicas = await Promise.all(
    data.practicas.map(practicaMongo => 
        this.practicaMapper.mongoPracticaToDomain(practicaMongo)
    )
)
        const disponibilidades = data.disponibilidades ? 
            data.disponibilidades.map(disponibilidadMongo => 
            {
                return new DisponibilidadHoraria(
                    disponibilidadMongo.diaSemana,
                    disponibilidadMongo.horaDesde,
                    disponibilidadMongo.horaHasta
                )
            }
            )
            :null

        const medico = new Medico(
            usuario,
            data.matricula,
            data.nombre,
            especialidades,
            practicas,
            sedes,
            disponibilidades
        )

        medico.id = data._id.toString()

        return medico
    }

    medicoToDTO(medico) {
        return {
            id: medico.id,
            nombre: medico.nombre,
            usuario: medico.usuario.nombre,
            matricula: medico.matricula,
            especialidades: medico.especialidades.map(especialidad => especialidad.nombre),
            practicas: medico.practicas.map(practica => practica.nombre),
            sedes: medico.sedes.map(sede => sede.nombre),
            disponibilidades: medico.disponibilidades
        }
    }
    medicoToMongo(medico) {
    return {
        _id: medico.id,
        usuario: medico.usuario.id,          // ← solo el ObjectId
        matricula: medico.matricula,
        nombre: medico.nombre,
        especialidades: medico.especialidades.map(e => ({
            id: e.id,
            nombre: e.nombre,
            duracionTurnoEnMins: e.duracionTurnoEnMins,
            costo: e.costo
        })),
        practicas: medico.practicas.map(p => ({
            id: p.id,
            codigo: p.codigo,
            nombre: p.nombre,
            duracionTurnoEnMins: p.duracionTurnoEnMins,
            costo: p.costo
        })),
        sedes: medico.sedes.map(s => s.id),  // ← solo los ObjectIds
        disponibilidades: medico.disponibilidades?.map(d => ({
            diaSemana: d.diaSemana,
            horaDesde: d.horaDesde,
            horaHasta: d.horaHasta
        })) ?? []
    }
}
}

const usuarioRepository = new MongoUsuarioRepository()
const sedeRepository = new MongoSedeRepository()


export const medicoMapper = new MedicoMapper(usuarioRepository,usuarioMapper, sedeRepository, sedeMapper, especialidadMapper, practicaMapper)