import './BotonesHome.css'
import { IoSearchSharp } from "react-icons/io5";

const BotonesHome = () =>{
    return (
        <>
        <div>
            <ul className="listaDeBotones">
                <li className="globoDeTexto">
                     ¿Que buscas hoy?
                </li>
                <li>
                    <button className="boton">
                        {/* Reemplazá el span por tu <img src="..." /> cuando tengas el logo */}
                        <span className="icono-btn"><IoSearchSharp /></span> 
                         Buscar turnos nuevos
                  </button>
                </li>
                <li>
                  <button className="boton">
                      <span className="icono-btn">📅</span> 
                      Consultar historial de turnos
                  </button>
                </li>
            </ul>
        </div>
        </>
    );
};

export default BotonesHome;