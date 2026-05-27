import { Usuario } from "./usuario.js";
import { ObraSocial } from "./obraSocial.js";
import { Plan } from "./plan.js";

export class Paciente{
    id
    usuario
    dni
    nombre
    obraSocial
    plan
    
    constructor(usuario, dni, nombre, obraSocial, plan){
        this.usuario = usuario;
        this.dni = dni;
        this.nombre = nombre;
        this.obraSocial = obraSocial;
        this.plan = plan;
    }
}