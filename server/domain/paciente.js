import { Usuario } from "./usuario.js";
import { ObraSocial } from "./obraSocial.js";
import { Plan } from "./plan.js";

export class Paciente{
    constructor(id, usuario, dni, nombre, obraSocial, plan){
        this.id = id;
        this.usuario = usuario;
        this.dni = dni;
        this.nombre = nombre;
        this.obraSocial = obraSocial;
        this.plan = plan;
    }
}