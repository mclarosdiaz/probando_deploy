import { Turno } from "./turno.js";
import { EstadoTurno } from "./estadoTurno.js";
import { horaAMinutos, fechaDesdeDisponibilidad } from "./fecha.js";

class Agenda {

    generarTurnosPara(servicio, medico, semanas = 4) {
        if (!medico) {
            throw new Error("medico undefined en agenda")
        }
      

        const turnos = []

        medico.disponibilidades.forEach(disponibilidad => {

            const inicio = horaAMinutos(disponibilidad.horaDesde)
            const fin = horaAMinutos(disponibilidad.horaHasta)
            const duracion = servicio.duracionTurnoEnMins

            const cantidadTurnos = Math.floor((fin - inicio) / duracion)

            for (let semana = 0; semana < semanas; semana++) {

                for (let i = 0; i < cantidadTurnos; i++) {

                    const minutosTurno = inicio + i * duracion

                    const fecha = fechaDesdeDisponibilidad(
                        disponibilidad.diaSemana,
                        minutosTurno,
                        semana
                    )

                    medico.sedes.forEach(sede => {
                        const turno = new Turno(
                            medico,
                            fecha,
                            sede,
                            EstadoTurno.DISPONIBLE,
                            servicio.costo
                        ) 
                        
                        turno.asignarServicio(servicio)
                        turnos.push(turno)
    
                    })
                }
            }

        })

        return turnos
    }



}

export const agenda = new Agenda()