import { Plan } from "./plan.js";

export class ObraSocial{
    id
    nombre
    planes
    
    constructor(nombre, planes){
        this.nombre = nombre;
        this.planes = planes;
    }
}