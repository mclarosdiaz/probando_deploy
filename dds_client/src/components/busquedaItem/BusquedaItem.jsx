import './BusquedaItem.css'

const BusquedaItem = ({turno}) =>{
    return (
        <tr>
            <td data-label="Dia y horario">{turno.fechaHora}</td>
            <td data-label="Servicio">{turno.servicio}</td>
            <td data-label="Sede">{turno.sede}</td>
            <td data-label="Medico">{turno.medico}</td>
            <td data-label="Costo">${turno.costo.toLocaleString('es-AR')}</td>
        </tr>
    );
};

export default BusquedaItem;