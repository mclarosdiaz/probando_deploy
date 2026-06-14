import './Registrar.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Button, CardContent, Stack, TextField, Typography, Box, Card } from '@mui/material'



const Registrar = () => {

    const [formData, setFormData] = useState({
        usuario: '',
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        confirmarPassword: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(formData)

        //TODO fetch al backend
    }

    return (
        <Box className="registro-page">

            <Card
                sx={{
                    width: '100%',
                    maxWidth: 550,
                    borderRadius: 5,
                    boxShadow: 6,
                    p: 2
                }}
            >
                <CardContent>
                    <Typography
                        variant = "h4"
                        fontWeight="bold"
                        gutterBottom
                    >
                        Crear cuenta
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                        mb={3}
                    >
                        Registrate para solicitar turnos
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                    >
                        <Stack spacing={2}>

                            <TextField
                                label="Usuario"
                                name="usuario"
                                value={formData.usuario}
                                onChange={handleChange}
                                fullWidth
                                required/>

                            <Stack
                                direction="row"
                                spacing={2}
                            >
                                <TextField
                                    label="Nombre"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />

                                <TextField
                                    label="Apellido"
                                    name="apellido"
                                    value={formData.apellido}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />

                            </Stack>

                            <TextField
                                label="Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                fullWidth
                                required
                            />

                            <Stack
                                direction="row"
                                spacing={2}
                            >
                                <TextField
                                    label="Contraseña"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />

                                <TextField
                                    label="Confirmar contraseña"
                                    type="password"
                                    name="confirmarPassword"
                                    value={formData.confirmarPassword}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />

                            </Stack>

                            <Button
                                type='submit'
                                variant='contained'
                                size='large'
                                fullWidth
                                sx={{
                                    mt: 1,
                                    borderRadius: 3,
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    py: 1.4
                                }}
                            >  
                                Registrarse
                            </Button>

                        </Stack>

                    </Box>

                    <Typography
                        textAlign="center"
                        mt={3}
                    >
                        ¿Ya tenés cuenta?{' '}
                        <Link to="/login">
                            Iniciar sesión
                        </Link>
                    </Typography>

                </CardContent>
            </Card>

        </Box>
    )

}

export default Registrar