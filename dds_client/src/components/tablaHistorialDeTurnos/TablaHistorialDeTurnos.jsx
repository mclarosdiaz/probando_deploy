import './TablaHistorialDeTurnos.css'
import { historialTurnos } from '../../mockdata/Turnos.js';
import HistorialItem from '../historialItem/HistorialItem.jsx';
import { useState } from "react"


const TablaHistorialDeTurnos = () =>{
    const [filtroServicio,setFiltroServicio] = useState("")
    return (
        <>
            <div className="filtro">
            <input
                type="text"
                placeholder="Buscar por servicio..."
                value={filtroServicio}
                onChange={(e) => setFiltroServicio(e.target.value)}
            />
            </div>
            <div className = "contenedor-tabla">
                <table className = "tablaHistorial">
                    <thead>
                        <tr>
                            <th scope="col" data-label="Dia y horario" className="cabecerasTablaHistorial">Dia y horario</th>
                            <th scope="col" data-label="ID" className="cabecerasTablaHistorial">ID</th>
                            <th scope="col" data-label="Medico" className="cabecerasTablaHistorial">Medico</th>
                            <th scope="col" data-label="Servicio" className="cabecerasTablaHistorial">Servicio</th>
                            <th scope="col" data-label="Sede" className="cabecerasTablaHistorial">Sede</th>
                            <th scope="col" data-label="Estado" className="cabecerasTablaHistorial">Estado</th>
                            <th scope="col" data-label="Costo" className="cabecerasTablaHistorial">Costo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historialTurnos.filter((turno)=>turno.servicio?.toLowerCase().includes(filtroServicio.toLowerCase())).map((turno)=>(<HistorialItem key={turno.id} turno={turno}/>))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TablaHistorialDeTurnos;