import './BusquedaItem.css'
import { useTurnoCart } from "../../hooks/useTurnoCart.js"

const BusquedaItem = ({ turno: itemConCobertura }) => {
    const { agregarTurno } = useTurnoCart()

    const { turno, costo, cobertura } = itemConCobertura
    
    const medicoNombre = turno?.medico?.nombre || "Médico no asignado"
    const sedeNombre = turno?.sede?.nombre || "Sede no asignada"
    
    const servicioNombre = turno?.servicio?.practica?.nombre || turno?.servicio?.especialidad?.nombre || "Consulta General"

    const formatearFecha = (fechaStr) => {
        if (!fechaStr) return "Sin fecha";
        const fecha = new Date(fechaStr);
        return fecha.toLocaleString('es-AR', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        }) + " hs";
    }

    const handleAgregar = () => {
        
        agregarTurno({
            id: turno.id || turno._id,
            fechaHora: formatearFecha(turno.fechaHora),
            servicio: servicioNombre,
            sede: sedeNombre,
            medico: medicoNombre,
            costo: costo,
            cobertura: cobertura
        })
    }

    return (
        <tr>
            <td data-label="Dia y horario"><strong>{formatearFecha(turno?.fechaHora)}</strong></td>
            <td data-label="Servicio">{servicioNombre}</td>
            <td data-label="Sede">{sedeNombre}</td>
            <td data-label="Medico">{medicoNombre}</td>
            <td data-label="Costo">
                <span className={`badge-cobertura ${cobertura}`}>
                    {costo === 0 ? "Cubierto 100%" : `$${costo.toLocaleString('es-AR')}`}
                </span>
            </td>
            <td>
                <button 
                    className="botonAgregarAlCarrito"
                    onClick={handleAgregar}
                > 
                    Agregar al Carrito 
                </button>
            </td>
        </tr>
    );
};

export default BusquedaItem;