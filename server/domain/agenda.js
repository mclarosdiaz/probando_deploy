import { Medico } from "./medico";
import { Turno } from "./turno";
import { Practica } from "./practica";
import { Especialidad } from "./especialidad";
import { EstadoTurno } from "./estadoTurno";
import { horaAMinutos, fechaDesdeDisponibilidad } from "./fecha";

export class Agenda{

    generarTurnosPara(especialidad, medico){   
        
        if(!medico.especialidades.includes(especialidad)){
            throw new Error("El médico no realiza esta especialidad");
        }
        
        const turnos = [] 

        medico.disponibilidades.forEach(disponibilidad =>{
            
            let inicio = horaAMinutos(disponibilidad.horaDesde)
            const fin = horaAMinutos(disponibilidad.horaHasta)

            const duracion = especialidad.duracionTurnoEnMins

            while(inicio + duracion <= fin){

                const fecha = fechaDesdeDisponibilidad(
                    disponibilidad.diaSemana,
                    inicio
                )

                medico.sedes.forEach(sede => {
                    const turno = new Turno(
                        medico,
                        fecha,
                        sede,
                        EstadoTurno.DISPONIBLE,
                        especialidad.costoConsulta
                    )

                    turnos.push(turno)
                })

                inicio += duracion
            }

        })

        return turnos
    }


    
}