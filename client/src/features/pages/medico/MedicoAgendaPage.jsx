import {
    Box,
    Typography
} from '@mui/material'

import AgendaCalendar
from '../../../components/medico/AgendaCalendar'

import useTurnosMedico
from '../../../hooks/useTurnosMedico'

export default function MedicoAgendaPage() {

    const { turnos } =
        useTurnosMedico()

    return (
        <Box p={4}>

            <Typography
                variant="h4"
                mb={3}
            >
                Agenda médica
            </Typography>

            <AgendaCalendar
                turnos={turnos}
            />

        </Box>
    )
}