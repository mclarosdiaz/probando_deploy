import { Link } from 'react-router-dom'

import {
    Box,
    Card,
    Typography,
    TextField,
    Button,
    IconButton,
    Stack
} from '@mui/material'

const LoginCard = ({ onClose }) => {

    const handleSubmit = (e) => {
        e.preventDefault()

        // TODO:
        // login backend
    }

    return (
        <Card
            sx={{
                position: 'absolute',
                top: '60px',
                right: 0,

                width: 340,

                borderRadius: 4,
                boxShadow: 8,

                p: 3,
                zIndex: 1000
            }}
        >
            {/* Header */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >
                <Typography
                    variant="h6"
                    fontWeight="bold"
                >
                    Iniciar sesión
                </Typography>

                <IconButton
                    size="small"
                    onClick={onClose}
                >
                    ✕
                </IconButton>
            </Box>

            {/* Form */}
            <Box
                component="form"
                onSubmit={handleSubmit}
            >
                <Stack spacing={2}>

                    <TextField
                        label="Usuario"
                        type="text"
                        fullWidth
                        required
                    />

                    <TextField
                        label="Contraseña"
                        type="password"
                        fullWidth
                        required
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{
                            borderRadius: 3,
                            textTransform: 'none'
                        }}
                    >
                        Iniciar sesión
                    </Button>

                </Stack>
            </Box>

            {/* Footer */}
            <Box
                mt={3}
                display="flex"
                flexDirection="column"
                gap={1}
            >
                <Link to="/recuperar-password">
                    ¿Olvidaste tu contraseña?
                </Link>

                <Typography variant="body2">
                    ¿No tenés cuenta?{' '}
                    <Link
                        to="/registrar"
                        onClick={onClose}
                    >
                        Registrarse
                    </Link>
                </Typography>
            </Box>
        </Card>
    )
}

export default LoginCard