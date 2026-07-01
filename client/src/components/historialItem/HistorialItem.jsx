import './HistorialItem.css'

const HistorialItem = ({turno}) =>{
    return (
        <tr>
            <td data-label="Dia y horario">{turno.fechaHora}</td>
            <td data-label="ID">{turno.id}</td>
            <td data-label="Medico">{turno.medico}</td>
            <td data-label="Servicio">{turno.servicio}</td>
            <td data-label="Sede">{turno.sede}</td>
            <td data-label="Estado">{turno.estado}</td>
            <td data-label="Costo">${turno.costo.toLocaleString('es-AR')}</td>
        </tr>
    );
};

export default HistorialItem;