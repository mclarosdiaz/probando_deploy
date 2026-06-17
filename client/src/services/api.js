import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const turnosService = {
    buscarDisponibles: async (filtrosFormulario, pagina = 1, limite = 10) => {
        try {
            const body = {
                idPaciente: "654321abcdef1234567890ab",
                nombreMedico: filtrosFormulario.medico || undefined,
                nombreEspecialidad: filtrosFormulario.especialidad || undefined,
                nombrePractica: filtrosFormulario.practica || undefined,
                nombreSede: filtrosFormulario.sede || undefined,
                fechaDesde: filtrosFormulario.fechaDesde || undefined,
                fechaHasta: filtrosFormulario.fechaHasta || undefined,
            };

            const response = await api.post('/turnos/disponibles/busqueda', body, {
                params: {
                    page: pagina,
                    limit: limite
                }
            });

            return response.data;
        } catch (error) {
            throw error.response?.data || new Error('Error en el sistema de turnos.');
        }
    }
};

export default api;