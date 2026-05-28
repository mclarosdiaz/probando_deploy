import { MongoMedicoRepository } from "../repositories/medicoRepository.js";
import { Medico } from "../domain/medico.js";
import { DisponibilidadHoraria } from "../domain/disponibilidadHoraria.js";
import { Practica } from "../domain/practica.js";
import { Especialidad } from "../domain/especialidad.js";
import {
    BadRequestError,
    PacienteNotFoundError,
    NotAllowedError,
    MedicoNotFoundError,
    ConflictError,
    UnprocessableEntityError
} from "../errors/appError.js";
import { TurnoService } from "./turnoService.js";
import { domainMapper } from "../middlewares/domainMapper.js";
import { dtoMapper } from "../middlewares/dtoMapper.js";

export class MedicoService {
    constructor(medicoRepository, turnoService) {
        this.medicoRepository = medicoRepository
        this.turnoService = turnoService 
    }

    async consultarDisponibilidades({ idMedico, servicio, idServicio }) {

        const mongoMedico = await this.findById(idMedico)
        const medico = domainMapper.mongoMedicoToDomain(mongoMedico)


        if (!medico.puedeHacerServicio(servicio)) {
            throw new BadRequestError("El médico no realiza esta práctica o especialidad")
        }

        const disponibilidades = medico.disponibilidades.filter(
            (disponibilidad) => {
                disponibilidad.validarSesion(servicio)
            })

        return disponibilidades
    }

    //TODO mover mapeo a Controllers

    async modificarDisponibilidades({ idMedico, nuevaDisponibilidades }) {
        
        const mongoMedico = await this.findById(idMedico)
        const medico = domainMapper.mongoMedicoToDomain(mongoMedico)

        medico.definirDisponibilidad(nuevasDisponibilidades)

        await this.turnoService.sincronizarTurnosDisponibles(idMedico, nuevasDisponibilidades)

        const medicoGuardado = await this.medicoRepository.save(medico)
        return dtoMapper.medicoToDTO(domainMapper.mongoMedicoToDomain(medicoGuardado))
    }

    async findById(idMedico) {

        const medico = await this.medicoRepository.findById(idMedico)

        if (!medico) {
            throw new MedicoNotFoundError("No se encontró el médico")
        }

        return medico
    }

    async agregarServicio(idMedico, nuevoServicio){
        const mongoMedico = await this.findById(idMedico)
        const medico = domainMapper.mongoMedicoToDomain(mongoMedico)

        medico.agregarServicio(nuevoServicio)

        const medicoGuardado = await this.medicoRepository.save(medico)
        return dtoMapper.medicoToDTO(domainMapper.mongoMedicoToDomain(medicoGuardado))
    }

    async eliminarServicio(idMedico, idServicio){
        const mongoMedico = await this.findById(idMedico)
        const medico = domainMapper.mongoMedicoToDomain(mongoMedico)

        medico.eliminarServicio(idServicio)

        const medicoGuardado = await this.medicoRepository.save(medico)
        return dtoMapper.medicoToDTO(domainMapper.mongoMedicoToDomain(medicoGuardado))
    }

    async modificarServicio(idMedico, servicioModificado){
        const mongoMedico = await this.findById(idMedico)
        const medico = domainMapper.mongoMedicoToDomain(mongoMedico)

        medico.modificarServicio(servicioModificado)

        const medicoGuardado = await this.medicoRepository.save(medico)
        return dtoMapper.medicoToDTO(domainMapper.mongoMedicoToDomain(medicoGuardado))
    }

}