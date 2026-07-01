export const mockNotificaciones = [
    {
        id: 1,
        destinatario: "Clarence",
        remitente: "Arthur",
        mensaje: "El turno para Dermatología del 02/07/2025 fue CONFIRMADO.",
        fechaHoraCreacion: "2025-06-25T14:30:00",
        fechaHoraLeida: null,
        leida: false
    },
    {
        id: 2,
        destinatario: "Clarence",
        remitente: "Elizabeth",
        mensaje: "Recordatorio: Mañana tenés un turno para Cardiología.",
        fechaHoraCreacion: "2025-08-21T08:00:00",
        fechaHoraLeida: "2025-08-21T09:15:00",
        leida: true
    },
    {
        id: 3,
        destinatario: "Arthur",
        remitente: "Clarence",
        mensaje: "El paciente ha cancelado el turno de Dermatología.",
        fechaHoraCreacion: "2025-06-26T10:00:00",
        fechaHoraLeida: null,
        leida: false
    }
];

// Funciones falsas 
export async function obtenerNotificacionesPorUsuario(nombreUsuario) {
    return mockNotificaciones.filter(notif => notif.destinatario === nombreUsuario);
}

export async function marcarComoLeidaMock(id) {
    const index = mockNotificaciones.findIndex(n => n.id === id);
    if (index !== -1) {
        mockNotificaciones[index].leida = true;
        mockNotificaciones[index].fechaHoraLeida = new Date().toISOString();
        return mockNotificaciones[index];
    }
    return null;
}