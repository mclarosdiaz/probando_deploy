import {
    BadRequestError
} from "../errors/appError.js";

//TODO mapear el dto en el controller (?

export class MedicoService {
    constructor(medicoRepository, turnoService) {
        this.medicoRepository = medicoRepository
        this.turnoService = turnoService 
    }

    async consultarDisponibilidades({ idMedico, nombreServicio }) {

        const medico = await this.medicoRepository.findById(idMedico)

        if (!medico.puedeHacerServicio(nombreServicio)) {
            throw new BadRequestError("El médico no realiza esta práctica o especialidad")
        }

        const disponibilidades = medico.disponibilidades.filter(
            (disponibilidad) => {
                disponibilidad.validarSesion(servicio)
            })

        return disponibilidades
    }


    async modificarDisponibilidades({ idMedico, nuevaDisponibilidades }) {
        
        const medico = await this.medicoRepository.findById(idMedico)

        medico.definirDisponibilidad(nuevasDisponibilidades)
        await this.turnoService.sincronizarTurnosDisponibles(idMedico, nuevasDisponibilidades)

        const medicoGuardado = await this.medicoRepository.save(medico)
        
        return medicoGuardado
    }

    async agregarServicio(idMedico, nuevoServicio){
        const medico = await this.medicoRepository.findById(idMedico)

        medico.agregarServicio(nuevoServicio)
        const medicoGuardado = await this.medicoRepository.save(medico)

        return medicoGuardado
    }

    async eliminarServicio(idMedico, idServicio){
        const medico = await this.medicoRepository.findById(idMedico)

        medico.eliminarServicio(idServicio)

        const medicoGuardado = await this.medicoRepository.save(medico)
        return medicoGuardado
    }

    async modificarServicio(idMedico, servicioModificado){
        const medico = await this.medicoRepository.findById(idMedico)

        medico.modificarServicio(servicioModificado)

        const medicoGuardado = await this.medicoRepository.save(medico)
        return medicoGuardado
    }
}