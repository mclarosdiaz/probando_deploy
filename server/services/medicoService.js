import {
    BadRequestError
} from "../errors/appError.js";

//TODO mapear el dto en el controller (?

export class MedicoService {
    constructor(medicoRepository, turnoService) {
        this.medicoRepository = medicoRepository
        this.turnoService = turnoService 
    }

    async consultarDisponibilidades({ idMedico, tipoServicio, idServicio }) {

        const medico = await this.medicoRepository.findById(idMedico)

        if (!medico.puedeHacerServicio(idServicio, tipoServicio)) {
            throw new BadRequestError("El médico no realiza esta práctica o especialidad")
        }

        const servicio = medico.buscarServicio(idServicio, tipoServicio)

        const disponibilidades = medico.disponibilidades.filter(
            (disponibilidad) => {
                disponibilidad.validarSesion(servicio)
            })

        return disponibilidades
    }


    async modificarDisponibilidades({ idMedico, nuevasDisponibilidades }) {
        
        const medico = await this.medicoRepository.findById(idMedico)

        medico.definirDisponibilidad(nuevasDisponibilidades)
        await this.turnoService.sincronizarTurnosDisponibles({idMedico, nuevasDisponibilidades})

        const medicoGuardado = await this.medicoRepository.save(medico)
        
        return medicoGuardado
    }

    async agregarServicio({idMedico, tipoServicio, nuevoServicio}){
        const medico = await this.medicoRepository.findById(idMedico)

        medico.agregarServicio(nuevoServicio, tipoServicio)
        const medicoGuardado = await this.medicoRepository.save(medico)

        return medicoGuardado
    }

    async eliminarServicio({idMedico, tipoServicio,idServicio}){
        const medico = await this.medicoRepository.findById(idMedico)

        medico.eliminarServicio(idServicio, tipoServicio)

        const medicoGuardado = await this.medicoRepository.save(medico)
        return medicoGuardado
    }

    async modificarServicio({idMedico, tipoServicio, servicioModificado}){
        const medico = await this.medicoRepository.findById(idMedico)

        medico.modificarServicio(servicioModificado, tipoServicio)

        const medicoGuardado = await this.medicoRepository.save(medico)
        return medicoGuardado
    }
}