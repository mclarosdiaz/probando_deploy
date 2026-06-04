import './BotonesHome.css'

const BotonesHome = () =>{
    return (
        <>
        <div>
            <ul className = "listaDeBotones">
                <li className = "globoDeTexto">
                    ¿Que buscas hoy?
                </li>
                <li>
                    <button className = "boton">Buscar turnos nuevos</button>
                </li>
                <li>
                    <button className = "boton">Consultar historial de turnos</button>
                </li>
            </ul>
        </div>
        </>
    );
};

export default BotonesHome;