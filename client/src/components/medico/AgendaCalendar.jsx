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

const localizer =
    dayjsLocalizer(dayjs)

export default function AgendaCalendar({
    turnos
}) {

    const [
        turnoSeleccionado,
        setTurnoSeleccionado
    ] = useState(null)

    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    borderRadius: 4
                }}
            >
                <div
                    style={{
                        height: '75vh'
                    }}
                >
                    <Calendar
                        localizer={localizer}
                        events={turnos}
                        startAccessor="start"
                        endAccessor="end"

                        titleAccessor={
                            (evento) =>
                                `${evento.paciente}`
                        }

                        views={[
                            'day',
                            'week',
                            'month'
                        ]}

                        defaultView="day"

                        messages={{
                            today: 'Hoy',
                            previous: 'Anterior',
                            next: 'Siguiente',
                            month: 'Mes',
                            week: 'Semana',
                            day: 'Día'
                        }}

                        onSelectEvent={
                            (turno) =>
                                setTurnoSeleccionado(
                                    turno
                                )
                        }

                        eventPropGetter={
                            (evento) => {

                                let style = {}

                                if (
                                    evento.estado ===
                                    'REALIZADO'
                                ) {
                                    style = {
                                        backgroundColor:
                                            '#4caf50'
                                    }
                                }

                                if (
                                    evento.estado ===
                                    'RESERVADO'
                                ) {
                                    style = {
                                        backgroundColor:
                                            '#1976d2'
                                    }
                                }

                                return {
                                    style
                                }
                            }
                        }
                    />
                </div>
            </Paper>

            <TurnoDialog
                open={
                    Boolean(
                        turnoSeleccionado
                    )
                }
                turno={
                    turnoSeleccionado
                }
                onClose={() =>
                    setTurnoSeleccionado(
                        null
                    )
                }
            />
        </>
    )
}