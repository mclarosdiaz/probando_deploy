import {
    Paper,
    Typography,
    Button,
    Stack
} from '@mui/material'

import { useNavigate } from 'react-router-dom'
import AgendaCalendar from '../../components/medico/AgendaCalendar'

export default function MedicoDashboard() {

    const navigate = useNavigate()

    return (
        <div
            style={{
                padding: '30px'
            }}
        >
            <Paper
                sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: '24px',
                    backgroundColor: '#dfead9',
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontFamily: '"Sour Gummy", sans-serif',
                        borderRadius: '18px',
                        textTransform: 'none',
                        mb: 2
                    }}
                >
                    Panel del Médico
                </Typography>

                <Stack
                    direction="row"
                    spacing={2}
                >
                    <Button
                        variant="contained"
                        onClick={() =>
                            navigate('/gs')
                        }

                        sx={{
                            fontFamily: '"Sour Gummy", sans-serif',
                            borderRadius: '18px',
                            textTransform: 'none'
                        }}
                    >
                        Gestionar Servicios
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() =>
                            navigate('/dh')
                        }

                        sx={{
                            fontFamily: '"Sour Gummy", sans-serif',
                            borderRadius: '18px',
                            textTransform: 'none'
                        }}
                    >
                        Disponibilidad
                    </Button>
                </Stack>
            </Paper>

            <Paper
                sx={{
                    p: 4,
                    borderRadius: '24px',
                    backgroundColor: '#dfead9'
                }}
            >
                <Typography
                    variant="h4"
                    sx={{ 
                        fontFamily: '"Sour Gummy", sans-serif',
                        borderRadius: '18px',
                        textTransform: 'none',
                        mb: 2
                    }}
                >
                    Agenda
                </Typography>

                <Stack
                    direction="row"
                    spacing={2}
                    sx={{ mb: 4 }}
                >
                    ...
                </Stack>

                <AgendaCalendar />
            </Paper>
        </div>
    )
}