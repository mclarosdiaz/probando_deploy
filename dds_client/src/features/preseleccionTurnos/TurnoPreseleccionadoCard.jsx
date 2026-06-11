import { useTurnoCart }
from '../../hooks/useTurnoCart'

const TurnoPreseleccionadoCard = ({
    turno
}) => {

    const {
        eliminarTurno
    } = useTurnoCart()

    return (
        <div className="turno-card">

            <div className="turno-info">

                <h4>
                    {turno.medico}
                </h4>

                <p>
                    {turno.especialidad}
                </p>

                <p>
                    {turno.fecha}
                </p>

                <p>
                    {turno.hora}
                </p>

            </div>

            <button
                onClick={() =>
                    eliminarTurno(
                        turno.id
                    )
                }
                className="btn-eliminar"
            >
                Sacar
            </button>

        </div>
    )
}

export default TurnoPreseleccionadoCard