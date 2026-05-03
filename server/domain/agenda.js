import { Medico } from "./medico";
import { Turno } from "./turno";
import { Practica } from "./practica";
import { Especialidad } from "./especialidad";
import { EstadoTurno } from "./estadoTurno";
import { horaAMinutos, fechaDesdeDisponibilidad } from "./fecha";

export class Agenda {

    generarTurnosPara(servicio, medico, semanas = 4) {

        if (!medico.puedeHacerServicio(servicio)) {
            throw new Error("El médico no realiza esta especialidad");
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
                        turnos.push(new Turno(
                            medico,
                            fecha,
                            sede,
                            EstadoTurno.DISPONIBLE,
                            servicio.costoConsulta
                        ))
                    })
                }
            }

        })

        return turnos
    }



}