import { DisponibilidadHoraria } from "./disponibilidadHoraria.js";
import { Especialidad } from "./especialidad.js";
import { Sede } from "./sede.js";
import { Practica } from "./practica.js";
import { Usuario } from "./usuario.js";



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
      /*   if (!this.puedeHacerServicio(idServicio)) {
            throw new Error("El servicio no pertenece a este médico")
        } */

        this.especialidades = this.especialidades.filter(especialidad => especialidad.id !== idServicio)
        this.practicas = this.practicas.filter(practica => practica.id !== idServicio)
    }

    modificarServicio(servicioModificado) {
        if (!this.puedeHacerServicio(servicioModificado.id)) {
            throw new UnprocessableEntityError("El servicio no pertenece a este médico")
        }

        this.eliminarServicio(servicioModificado.id)
        this.agregarServicio(servicioModificado)
    }

}