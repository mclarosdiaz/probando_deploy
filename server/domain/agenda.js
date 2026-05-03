import { Medico } from "./medico";
import { Turno } from "./turno";
import { Practica } from "./practica";
import { Especialidad } from "./especialidad";
import { EstadoTurno } from "./estadoTurno";
import { horaAMinutos, fechaDesdeDisponibilidad } from "./fecha";

export class Agenda {

    generarTurnosPara(especialidad, medico, semanas = 4) {

        if (!medico.especialidades.includes(especialidad)) {
            throw new Error("El médico no realiza esta especialidad");
        }

        const turnos = []

        medico.disponibilidades.forEach(disponibilidad => {

            const inicio = horaAMinutos(disponibilidad.horaDesde)
            const fin = horaAMinutos(disponibilidad.horaHasta)
            const duracion = especialidad.duracionTurnoEnMins

            const cantidadTurnos = Math.floor((fin - inicio) / duracion)

            for (let semana = 0; semana < semanas; semana++) {

                for (let i = 0; i < cantidadTurnos; i++) {

                    const minutosTurno = inicio + i * duracion

                    const fecha = fechaDesdeDisponibilidad(
                        disponibilidad.diaSemana,
                        minutosTurno,
                        semana
                    )

                    medico.sedes.forEacy(sede => {
                        turnos.push(new Turno(
                            medico,
                            fecha,
                            sede,
                            EstadoTurno.DISPONIBLE,
                            especialidad.costoConsulta
                        ))
                    })
                }
            }

        })

        return turnos
    }



}