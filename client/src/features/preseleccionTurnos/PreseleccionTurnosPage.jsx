import './PreseleccionTurnos.css'
import { useTurnoCart } from '../../hooks/useTurnoCart.js'
import TurnoPreseleccionadoCard from "./TurnoPreseleccionadoCard.jsx"

const PreseleccionTurnosPage = () => {

    const {
        turnos,
        cantidadTurnos,
        limpiarTurnos
    } = useTurnoCart()

    return (
        <div className="preseleccion-container">

            <h1>
                Mi Preselección
            </h1>

            {cantidadTurnos === 0 ? (
                <div className="empty-state">

                    <h3>
                        No hay turnos preseleccionados
                    </h3>

                    <p>
                        Agregá turnos desde la
                        búsqueda.
                    </p>

                </div>
            ) : (
                <>
                    <div className="turnos-list">

                        {turnos.map(turno => (
                            <TurnoPreseleccionadoCard
                                key={turno.id}
                                turno={turno}
                            />
                        ))}

                    </div>

                    <div className="resumen-box">

                        <h3>
                            Resumen
                        </h3>

                        <p>
                            Turnos
                            seleccionados:
                            <strong>
                                {' '}
                                {cantidadTurnos}
                            </strong>
                        </p>

                        <button
                            onClick={
                                limpiarTurnos
                            }
                            className="btn-vaciar"
                        >
                            Vaciar selección
                        </button>

                    </div>
                </>
            )}

        </div>
    )
}

export default PreseleccionTurnosPage