import { UnprocessableEntityError } from "../errors/appError"

export class Medico{
    id 
    usuario
    matricula
    nombre
    especialidades
    practicas
    sedes 
    disponibilidades

    constructor(usuario,matricula,nombre,especialidades,practicas,sedes,disponibilidades){
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

    puedeHacerServicio(nombreServicio){
        return this.especialidades.some((s) => s.nombre === nombreServicio)
        || this.practicas.some((s) => s.nombre === nombreServicio)
    }

    buscarServicio(nombreServicio){
        const servicios = this.especialidades.concat(this.practicas)
        
        return servicios.find(servicio => servicio.nombre === nombreServicio)
    }
    
    agregarServicio(nuevoServicio) {
        if (!this.puedeHacerServicio(nuevoServicio.id)) {
            if (nuevoServicio.codigo) {
                this.practicas.push(nuevoServicio)
            }else {
            this.especialidades.push(nuevoServicio)
            }
        }
    }

    eliminarServicio(nombreServicio) {
        if (!this.puedeHacerServicio(nombreServicio)) {
            console.log("HOLA")
            throw new UnprocessableEntityError("El servicio no pertenece a este médico")
        } 

        this.especialidades = this.especialidades.filter(especialidad => especialidad.nombre !== nombreServicio)
        this.practicas = this.practicas.filter(practica => practica.nombre !== nombreServicio)
    }

    modificarServicio(servicioModificado) {
        if (!this.puedeHacerServicio(servicioModificado.nombre)) {
            throw new UnprocessableEntityError("El servicio no pertenece a este médico")
        }

        this.eliminarServicio(servicioModificado.nombre)
        this.agregarServicio(servicioModificado)
    }

}