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

    definirDisponibilidad(disponibilidad){
        this.disponibilidades.push(disponibilidad);
    }

    puedeHacerServicio(servicio){
        return this.especialidades.includes(servicio)
            || this.practicas.includes(servicio)
    }
    

}