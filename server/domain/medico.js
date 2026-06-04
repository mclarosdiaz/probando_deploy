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

   
    obtenerColeccionServicios(tipo) {
        const tipoNormalizado = tipo.toLowerCase()

        const colecciones = {
            especialidad: this.especialidades,
            practica: this.practicas
        }

        const coleccion = colecciones[tipoNormalizado]

        if (!coleccion) {
            throw new UnprocessableEntityError(
                "No es un tipo de servicio válido"
            )
        }

        return coleccion
    }

    buscarServicio(idServicio, tipo) {
        return this
            .obtenerColeccionServicios(tipo)
            .find(servicio => servicio.id === idServicio)
    }

    puedeHacerServicio(idServicio, tipo){
        return this
            .obtenerColeccionServicios(tipo)
            .some(servicio => servicio.id === idServicio)
    }
    
    agregarServicio(nuevoServicio, tipo) {
        const servicios = this.obtenerColeccionServicios(tipo)

        const yaExiste = servicios.find(servicio => servicio.id === nuevoServicio.id)

        if(!yaExiste){
            servicios.push(nuevoServicio)
        }
    }

    eliminarServicio(idServicio, tipo) {
        if(!this.puedeHacerServicio(idServicio, tipo)){
            throw new UnprocessableEntityError("El médico no realiza este servicio")
        }

        const serviciosFiltrados = this.obtenerColeccionServicios(tipo).filter(servicio => servicio.id != idServicio)

        if(tipo.toLowerCase() === "especialidad"){
            this.especialidades = serviciosFiltrados
        }else{
            this.practicas = serviciosFiltrados
        }
    }

    modificarServicio(servicioModificado, tipo) {
        if (!this.puedeHacerServicio(servicioModificado.id,tipo)) {
            throw new UnprocessableEntityError("El médico no realiza este servicio")
        }

        this.eliminarServicio(servicioModificado.id, tipo)
        this.agregarServicio(servicioModificado, tipo)
    }

}