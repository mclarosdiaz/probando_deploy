export const historialTurnos =[
    {
        id: 1234,
        fechaHora: "10/06/2025",
        estado: "REALIZADO",
        costo: "25000",
        medico: "William",
        paciente: "Clarence",
        sede: "Medrano",
        servicio: "Odontologia"
    },
        {
        id: 1235,
        fechaHora: "2/07/2025",
        estado: "REALIZADO",
        costo: "10000",
        medico: "Arthur",
        paciente: "Clarence",
        sede: "Lugano",
        servicio: "Dermatologia"
    },
        {
        id: 1236,
        fechaHora: "22/08/2025",
        estado: "REALIZADO",
        costo: "30000",
        medico: "Elizabeth",
        paciente: "Clarence",
        sede: "Pacheco",
        servicio: "Cardiologia"
    }
];

export const turnosDisponibles =[
    {
        id: 100,
        fechaHora: "11/11/2025",
        costo: "60000",
        medico: "John",
        sede: "Medrano",
        servicio: "Podologia"
    },
        {
        id: 101,
        fechaHora: "03/06/2026",
        costo: "10000",
        medico: "Micah",
        sede: "Medrano",
        servicio: "Fisioterapia"
    },
        {
        id: 102,
        fechaHora: "18/10/2026",
        costo: "2000",
        medico: "Dutch",
        sede: "Medrano",
        servicio: "Oftalmologia"
    },
        {
        id: 103,
        fechaHora: "21/07/2026",
        costo: "90000",
        medico: "Abigail",
        sede: "La estrella de la muerte",
        servicio: "Kinesiologia"
    },
        {
        id: 104,
        fechaHora: "28/07/2026",
        costo: "70000",
        medico: "Charles",
        sede: "Medrano",
        servicio: "Fisioterapia"
    }
]

async function obtenerHistorial() {
  return historialTurnos;
}

async function obtenerTurnosPorId(id) {
  return historialTurnos.find((turno) => turno.id === id) ?? null;
}