import {
    Box,
    Typography,
    Paper
} from '@mui/material'

import AgendaCalendar from '../../../components/medico/AgendaCalendar'

export default function MedicoAgendaPage() {

    return (
        <Box p={4}>

            <Typography
                variant="h4"
                gutterBottom
            >
                Agenda médica
            </Typography>

            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    borderRadius: 4
                }}
            >
                <AgendaCalendar />
            </Paper>

        </Box>
    )
}