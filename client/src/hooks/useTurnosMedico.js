import { useMemo } from 'react'

export default function useTurnosMedico() {

    const turnos = useMemo(() => ([
        {
            id: 1,
            paciente: 'María Gómez',
            practica: 'Consulta clínica',
            estado: 'RESERVADO',

            start: new Date(
                2026,
                5,
                14,
                9,
                0
            ),

            end: new Date(
                2026,
                5,
                14,
                9,
                30
            )
        },

        {
            id: 2,
            paciente: 'Juan López',
            practica: 'Cardiología',
            estado: 'REALIZADO',

            start: new Date(
                2026,
                5,
                14,
                10,
                30
            ),

            end: new Date(
                2026,
                5,
                14,
                11,
                0
            )
        }
    ]), [])

    return { turnos }
}