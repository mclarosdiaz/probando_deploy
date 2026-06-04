const historialTurnos =[
    {
        id: 1234,
        fechaHora: "10/06/2025",
        estado: "REALIZADO",
        costo: "$25000",
        medico: "William",
        paciente: "Clarence",
        sede: "Medrano",
        servicio: "Odontologia"
    },
        {
        id: 1235,
        fechaHora: "2/07/2025",
        estado: "REALIZADO",
        costo: "$10000",
        medico: "Arthur",
        paciente: "Clarence",
        sede: "Lugano",
        servicio: "Dermatologia"
    },
        {
        id: 1236,
        fechaHora: "22/08/2025",
        estado: "REALIZADO",
        costo: "$30000",
        medico: "Elizabeth",
        paciente: "Clarence",
        sede: "Pacheco",
        servicio: "Cardiologia"
    }
];

async function obtenerHistorial() {
  return historialTurnos;
}

async function obtenerTurnosPorId(id) {
  return historialTurnos.find((turno) => turno.id === id) ?? null;
}