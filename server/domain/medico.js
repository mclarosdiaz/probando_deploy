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
    
    

}