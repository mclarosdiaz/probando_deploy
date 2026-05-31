import { Turno } from "../../domain/turno.js"
import { Medico } from "../../domain/medico.js"
import { Sede } from "../../domain/sede.js"
import { Paciente } from "../../domain/paciente.js"
import { MongoMedicoRepository } from "../../repositories/medicoRepository.js"
import { MongoPacienteRepository } from "../../repositories/pacienteRepository.js"
import { MongoSedeRepository } from "../../repositories/sedeRepository.js"
import { EstadoTurno } from "../../domain/estadoTurno.js"
import { medicoMapper } from "./medicoMapper.js"
import { pacienteMapper } from "./pacienteMapper.js"
import { sedeMapper } from "./sedeMapper.js"
import { cambioEstadoTurnoMapper } from "./cambioEstadoTurnoMapper.js"

class TurnoMapper{
    constructor(medicoRepository, medicoMapper, pacienteRepository, pacienteMapper, sedeRepository, sedeMapper, cambioEstadoTurnoMapper){
        this.medicoRepository = medicoRepository
        this.medicoMapper = medicoMapper
        this.pacienteRepository = pacienteRepository
        this.pacienteMapper = pacienteMapper
        this.sedeRepository = sedeRepository
        this.sedeMapper = sedeMapper
        this.cambioEstadoTurnoMapper = cambioEstadoTurnoMapper
    }

    async mongoTurnoToDomain(mongoTurno) {

        const data = mongoTurno.toObject()

        const medico = await this.medicoRepository.findById(data.medico)
        
        const paciente = await this.pacienteRepository.findById(data.paciente)

        const sede = await this.sedeRepository.findById(data.sede)

        const turno = new Turno(
            medico,
            data.fechaHora,
            sede,
            data.estado,
            data.costo
        )

        turno.id = data._id.toString()

        turno.paciente = paciente
        
        const historialEstados = data.historialEstados.map(mongoCambioEstadoTurno =>
            this.cambioEstadoTurnoMapper.cambioEstadoTurnoToDomain(mongoCambioEstadoTurno)
        )

        turno.historialEstados = historialEstados

        return turno
    }

    turnoToDTO(turno) {
        const servicioAsignado = turno.getServicio()

        return {
            id: turno.id,
            fechaHora: turno.fechaHora,
            estado: turno.estado,
            costo: turno.costo,
            medico: {
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
}

const medicoRepository = new MongoMedicoRepository()
const pacienteRepository = new MongoPacienteRepository()
const sedeRepository = new MongoSedeRepository()

export const turnoMapper = new TurnoMapper(medicoRepository, medicoMapper, pacienteRepository, pacienteMapper, sedeRepository,  sedeMapper, cambioEstadoTurnoMapper)