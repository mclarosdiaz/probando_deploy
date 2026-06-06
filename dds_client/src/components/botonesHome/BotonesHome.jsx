import './BotonesHome.css'
import { IoSearchSharp } from "react-icons/io5";
import { LuCalendarClock } from "react-icons/lu";
import { Link } from 'react-router-dom';

const BotonesHome = () =>{
    return (
        <>
        <div>
            <ul className="listaDeBotones">
                <li className="globoDeTexto">
                     ¿Qué buscas hoy?
                </li>
                <li>
                    <button className="boton">
                       <Link to ={'/busquedaDeTurnos'} className = "link-boton"> 
                        <span className="icono-btn"><IoSearchSharp /></span> 
                         Buscar turnos nuevos
                       </Link> 
                  </button>
                </li>
                <li>
                  <button className="boton">
                     <Link to = {'/historialDeTurnos'} className = "link-boton">
                      <span className="icono-btn"><LuCalendarClock /></span> 
                      Consultar historial de turnos
                      </Link>
                  </button>
                </li>
            </ul>
        </div>
        </>
    );
};

export default BotonesHome;