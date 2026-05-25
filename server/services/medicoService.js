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

export class MedicoService {
    constructor(medicoRepository, turnoService) {
        this.medicoRepository = medicoRepository
        this.turnoService = turnoService 
    }

    async consultarDisponibilidades({ idMedico, servicio, idServicio }) {


        const medico = await this.findById(idMedico)


        if (!medico.puedeHacerServicio(servicio)) {
            throw new BadRequestError("El médico no realiza esta práctica o especialidad")
        }

        const disponibilidades = medico.disponibilidades.filter(
            (disponibilidad) => {
                disponibilidad.validarSesion(servicio)
            })

        return disponibilidades
    }

    async modificarDisponibilidades({ idMedico, nuevaDisponibilidades }) {
        const medico = await this.findById(idMedico)
        medico.definirDisponibilidad(nuevasDisponibilidades)

        await this.turnoService.sincronizarTurnosDisponibles(idMedico, nuevasDisponibilidades)

        return this.medicoRepository.save(medico)
    }

    async findById(idMedico) {

        const medico = await this.medicoRepository.findById(idMedico)

        if (!medico) {
            throw new MedicoNotFoundError("No se encontró el médico")
        }

        return medico
    }

    async agregarServicio(idMedico, nuevoServicio){
        const medico = await this.findById(idMedico)

        medico.agregarServicio(nuevoServicio)

        return await this.medicoRepository.save(medico)
    }

    async eliminarServicio(idMedico, idServicio){
        const medico = await this.findById(idMedico)

        medico.eliminarServicio(idServicio)

        return await this.medicoRepository.save(medico)
    }

    async modificarServicio(idMedico, servicioModificado){
        const medico = await this.findById(idMedico)

        medico.modificarServicio(servicioModificado)

        return await this.medicoRepository.save(medico)
    }

}