import './HistorialTurnosPage.css'
import TablaHistorialDeTurnos from '../../components/tablaHistorialDeTurnos/TablaHistorialDeTurnos.jsx'

const HistorialTurnosPage = () =>{
    return (
        <>
        <div className = "historialTurnos-body">
            <TablaHistorialDeTurnos />
        </div>
        </>
    );
};

export default HistorialTurnosPage;