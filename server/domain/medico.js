import { DisponibilidadHoraria } from "./disponibilidadHoraria";
import { Especialidad } from "./especialidad";
import { Sede } from "./sede";
import { Practica } from "./practica";
import { Usuario } from "./usuario";



export class Medico{
    constructor(id,usuario,matricula,nombre,especialidades,practicas,sedes,disponibilidades){
        this.id = id;
        this.usuario = usuario;
        this.matricula = matricula;
        this.nombre = nombre;
        this.especialidades = especialidades;
        this.practicas = practicas;
        this.sedes = sedes;
        this.disponibilidades = disponibilidades;
    }

    definirDisponibilidad(nuevasDisponibilidades){
        this.disponibilidades = nuevasDisponibilidades;
    }

    puedeHacerServicio(servicio){
        return this.especialidades.includes(servicio)
            || this.practicas.includes(servicio)
    }
    
    agregarServicio(nuevoServicio) {
        if (this.puedeHacerServicio(nuevoServicio.id)) {
            throw new ConflictError("El médico ya tiene asignado este servicio")
        }

        if (nuevoServicio.codigo) {
            this.practicas.push(nuevoServicio)
        } else {
            this.especialidades.push(nuevoServicio)
        }
    }

    eliminarServicio(idServicio) {
        if (!this.puedeHacerServicio(idServicio)) {
            throw new UnprocessableEntityError("El servicio no pertenece a este médico")
        }

        this.especialidades = this.especialidades.filter(especialidad => especialidad.id !== idServicio)
        this.practicas = this.practicas.filter(practica => practica.id !== idServicio)
    }

    modificarServicio(idServicio, datosModificados) {
        if (!this.puedeHacerServicio(idServicio)) {
            throw new UnprocessableEntityError("El servicio no pertenece a este médico")
        }

        for (let especialidad of this.especialidades) {
            if (especialidad.id === idServicio) {
                if (datosModificados.costo) especialidad.costo = datosModificados.costo
                if (datosModificados.duracionTurnoEnMins) especialidad.duracionTurnoEnMins = datosModificados.duracionTurnoEnMins
                return
            }
        }
        for (let practica of this.practicas) {
            if (practica.id === idServicio) {
                if (datosModificados.costo) practica.costo = datosModificados.costo
                if (datosModificados.duracionTurnoEnMins) practica.duracionTurnoEnMins = datosModificados.duracionTurnoEnMins
                return
            }
        }
    }

}