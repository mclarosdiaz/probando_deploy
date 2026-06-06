import './TablaHistorialDeTurnos.css'
import { historialTurnos } from '../../mockdata/Turnos.js';
import HistorialItem from '../historialItem/HistorialItem.jsx';

const TablaHistorialDeTurnos = () =>{
    return (
        <>
            <div className = "tablaHistorial">
                <table>
                    <thead>
                        <tr className>
                            <th scope="col">Dia y horario</th>
                            <th scope="col">ID</th>
                            <th scope="col">Medico</th>
                            <th scope="col">Servicio</th>
                            <th scope="col">Sede</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Costo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historialTurnos.map((turno) => (<HistorialItem key={turno.id} turno={turno} />))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TablaHistorialDeTurnos;