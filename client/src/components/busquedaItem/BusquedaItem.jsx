import './BusquedaItem.css'
import { useTurnoCart } from "../../hooks/useTurnoCart.js"
const BusquedaItem = ({turno}) =>{
    const { agregarTurno } = useTurnoCart()
    const handleAgregar = () =>
    {
        agregarTurno(turno)
    }
    return (
        <tr>
            <td data-label="Dia y horario">{turno.fechaHora}</td>
            <td data-label="Servicio">{turno.servicio}</td>
            <td data-label="Sede">{turno.sede}</td>
            <td data-label="Medico">{turno.medico}</td>
            <td data-label="Costo">${turno.costo.toLocaleString('es-AR')}</td>
            <td>
                <button className = "botonAgregarAlCarrito"
                onClick={handleAgregar}> 
                    Agregar al Carrito 
                </button>
            </td>
        </tr>
    );
};

export default BusquedaItem;