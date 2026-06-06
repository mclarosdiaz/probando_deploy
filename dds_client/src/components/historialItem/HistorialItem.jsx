import './HistorialItem.css'

const HistorialItem = ({turno}) =>{
    return (
        <tr>
            <th scope="row">{turno.fechaHora}</th>
            <td>{turno.id}</td>
            <td>{turno.medico}</td>
            <td>{turno.servicio}</td>
            <td>{turno.sede}</td>
            <td>{turno.estado}</td>
            <td>{turno.costo}</td>
        </tr>
    );
};

export default HistorialItem;