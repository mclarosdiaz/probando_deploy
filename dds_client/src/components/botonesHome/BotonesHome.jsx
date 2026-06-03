import './BotonesHome.css'

const BotonesHome = () =>{
    return (
        <>
        <div>
            <ul className = "listaDeBotones">
                <li className = "globoDeTexto">
                    <u>¿Que buscas hoy?</u>
                </li>
                <li className = "botonesDeOpcion">
                    <u>Buscar turnos nuevos</u>
                </li>
                <li className = "botonesDeOpcion">
                    <u>Consultar historial de turnos</u>
                </li>
            </ul>
        </div>
        </>
    );
};

export default BotonesHome;