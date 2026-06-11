import './TablaBusquedaDeTurnos.css'
import { useTurnoCart } from "../../hooks/useTurnoCart.js"
import { useState } from "react"
import { turnosDisponibles } from '../../mockdata/Turnos.js';

const TablaBusquedaDeTurnos = () =>{
    const { agregarTurno } = useTurnoCart()
    const [filtroServicio,setFiltroServicio] = useState("")
    const [filtroMedico,setFiltroMedico] = useState("")
    const [filtroSede,setFiltroSede] = useState("")
    const [fechaDesde, setFechaDesde] = useState("");
    const [fechaHasta, setFechaHasta] = useState("");
    const turnosAMostrar = turnosDisponibles;
    return (
        <>
        <div className = "busquedaDeTurnos-Container">
            
            <div className = "busqueda">
                <div className = "filtrosDeBusqueda">
                    <input
                    type="text"
                    placeholder="Buscar por servicio..."
                    value={filtroServicio}
                    onChange={(e) => setFiltroServicio(e.target.value)}
                    />        

                    <input
                    type="text"
                    placeholder="Sede"
                    value={filtroSede}
                    onChange={(e) => setFiltroSede(e.target.value)}
                    />

                    <input
                    type="date"
                    value={fechaDesde}
                    onChange={(e) => setFechaDesde(e.target.value)}
                    />
                
                    <input
                    type="date"
                    value={fechaHasta}
                    onChange={(e) => setFechaHasta(e.target.value)}
                    />
                </div>
                <div className = "botonBusquedaDeTurnos">
                    <button>
                        
                    </button>
                </div>
            </div>

            <div className = "tablaDeTurnosDisponibles">
               <table className = "tablaHistorial">
                    <thead>
                        <tr>
                            <th scope="col" data-label="Dia y horario" className="cabecerasTablaHistorial">Dia y horario</th>
                            <th scope="col" data-label="Servicio" className="cabecerasTablaHistorial">Servicio</th>
                            <th scope="col" data-label="Sede" className="cabecerasTablaHistorial">Sede</th>
                            <th scope="col" data-label="Medico" className="cabecerasTablaHistorial">Medico</th>
                            <th scope="col" data-label="Costo" className="cabecerasTablaHistorial">Costo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*{turnosAMostrar.filter((turno)=>turno.servicio?.toLowerCase().includes(filtroServicio.toLowerCase())).map((turno)=>(<HistorialItem key={turno.id} turno={turno}/>))}*/}
                    </tbody>
                </table>
            </div>

        </div>
        </>
    );
};


export default TablaBusquedaDeTurnos;

/*          <button
            onClick={() =>agregarTurno({
                id: Date.now(),
                precio: 5000
            })}> Agregar turno fake
        </button>
*/