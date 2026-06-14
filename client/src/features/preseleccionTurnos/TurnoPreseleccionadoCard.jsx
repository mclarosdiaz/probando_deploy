import { useTurnoCart } from '../../hooks/useTurnoCart'

const TurnoPreseleccionadoCard = ({ turno }) => {
    const { eliminarTurno } = useTurnoCart()

    return (
        <div className="turno-card">
            <div className="turno-info">
                <h4>Médico: {turno.medico}</h4>
                <p className="turno-detalle"><strong>Servicio:</strong> {turno.servicio}</p>
                <p className="turno-detalle"><strong>Sede:</strong> {turno.sede}</p>
                <p className="turno-detalle"><strong>Fecha y Hora:</strong> {turno.fechaHora}</p>
                <p className="turno-costo">Costo: ${turno.costo?.toLocaleString('es-AR')}</p>
            </div>
            <button
                onClick={() => eliminarTurno(turno.id)}
                className="btn-eliminar"
            >
                Sacar
            </button>
        </div>
    )
}

export default TurnoPreseleccionadoCard