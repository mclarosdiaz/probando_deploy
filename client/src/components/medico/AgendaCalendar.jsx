import { useState } from 'react'

import {
    Calendar,
    dayjsLocalizer
} from 'react-big-calendar'

import dayjs from 'dayjs'

import {
    Paper
} from '@mui/material'

import TurnoDialog
from './TurnoDialog'

import
'react-big-calendar/lib/css/react-big-calendar.css'

import { turnosAgenda } from '../../mockdata/Turnos'

function convertirTurnosAgenda(turnosDisponibles) {
    return turnosDisponibles.map((turno) => {

        const [dia, mes, anio] =
            turno.fechaHora.split('/')

        const fecha =
            new Date(anio, mes - 1, dia)

        // agrego hora mock para que se vea en el día
        fecha.setHours(
            Math.floor(Math.random() * 8) + 8,
            0
        )

        const fin = new Date(fecha)
        fin.setMinutes(
            fin.getMinutes() + 30
        )

        return {
            id: turno.id,

            paciente:
                'Turno Disponible',

            medico:
                turno.medico,

            sede:
                turno.sede,

            servicio:
                turno.servicio,

            costo:
                turno.costo,

            estado:
                'RESERVADO',

            fechaHora: 
                turno.fechaHora,

            start: fecha,
            end: fin
        }
    })
}

const turnosMappeados = convertirTurnosAgenda(turnosAgenda)


const localizer =
    dayjsLocalizer(dayjs)

export default function AgendaCalendar({
    turnos = turnosMappeados
}) {

    const [
        turnoSeleccionado,
        setTurnoSeleccionado
    ] = useState(null)

    const [
        fechaActual,
        setFechaActual
    ] = useState(
        turnos[0]?.start
        ?? new Date()
    )


    return (
        <div
            style={{
                height: '75vh',
                padding: '20px'
            }}
        >
            <Calendar
                localizer={localizer}

                events={turnosMappeados}

                startAccessor="start"
                endAccessor="end"

                defaultView="month"

                views={[
                    'month',
                    'week',
                    'day'
                ]}

                onSelectEvent={(
                    turno
                ) =>
                    setTurnoSeleccionado(
                        turno
                    )
                }
            />

            <TurnoDialog
                open={Boolean(
                    turnoSeleccionado
                )}
                turno={
                    turnoSeleccionado
                }
                onClose={() =>
                    setTurnoSeleccionado(
                        null
                    )
                }
            />
        </div>
    )
}