import './TablaBusquedaDeTurnos.css'
import { useTurnoCart } from "../../hooks/useTurnoCart.js"
import { useState } from "react"
import { turnosDisponibles } from '../../mockdata/Turnos.js';
import  BusquedaItem  from '../busquedaItem/BusquedaItem.jsx';

function parseFecha(fechaStr) {
    const [dia, mes, anio] = fechaStr.split("/");
    return new Date(`${anio}-${mes}-${dia}`);
}

const TablaBusquedaDeTurnos = () =>{
    const { agregarTurno } = useTurnoCart()
    const [filtroServicio,setFiltroServicio] = useState("")
    const [filtroMedico,setFiltroMedico] = useState("")
    const [filtroSede,setFiltroSede] = useState("")
    const [fechaDesde, setFechaDesde] = useState("");
    const [fechaHasta, setFechaHasta] = useState("");
    
    const turnosFiltrados = turnosDisponibles.filter((turno) => {
        const coincideServicio = turno.servicio
            ?.toLowerCase()
            .includes(filtroServicio.toLowerCase())

        const coincideMedico = turno.medico
            ?.toLowerCase()
            .includes(filtroMedico.toLowerCase())

        const coincideSede = turno.sede
            ?.toLowerCase()
            .includes(filtroSede.toLowerCase())

        const fechaTurno = parseFecha(turno.fechaHora)

        const coincideDesde = fechaDesde
            ? fechaTurno >= parseFecha(fechaDesde)
            : true

        const coincideHasta = fechaHasta
            ? fechaTurno <= parseFecha(fechaHasta)
            : true

        return (
            coincideServicio &&
            coincideMedico &&
            coincideSede &&
            coincideDesde &&
            coincideHasta
        )
    })

    const turnosOrdenados = [...turnosFiltrados].sort((a, b) =>
        parseFecha(a.fechaHora) - parseFecha(b.fechaHora)
    )

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
                            <th scope="col" data-label="" className="cabecerasTablaHistorial"></th>
                        </tr>
                    </thead>
                    <tbody>
                         {turnosOrdenados.map((turno) => (
                            <BusquedaItem
                                key={turno.id}
                                turno={turno}
                                onAgregar={() => agregarTurno(turno)}
                            />
                          ))}
                    </tbody>
                </table>
            </div>

        </div>
        </>
    );
};


export default TablaBusquedaDeTurnos;