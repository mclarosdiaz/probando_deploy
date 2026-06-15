import { createContext, useReducer } from "react"

export const TurnoCartContext = createContext()

const initialState = {
    turnos: []
}

function turnoCartReducer(state, action) {

    switch (action.type) {

        case "ADD_TURNO": {
            console.log("=== INTENTANDO AGREGAR TURNO ===");
            console.log("Turno que querés meter (Payload):", action.payload);
            console.log("Turnos que ya están en el carrito:", state.turnos);

            const turnoYaExiste = state.turnos.some(
                turno => {
                    const idExistente = turno.id || turno._id;
                    const idNuevo = action.payload.id || action.payload._id;
                    return idExistente === idNuevo;
                }
            )

            console.log("¿El sistema cree que ya existe?:", turnoYaExiste);

            if (turnoYaExiste) {
                return state;
            }

            return {
                ...state,
                turnos: [...state.turnos, action.payload]
            }
        }

        case "REMOVE_TURNO":

            return {
                ...state,
                turnos: state.turnos.filter(
                    turno =>
                        turno.id !== action.payload
                )
            }

        case "CLEAR_TURNOS":

            return {
                ...state,
                turnos: []
            }

        default:
            return state
    }
}

export function TurnoCartProvider({
    children
}) {

    const [state, dispatch] = useReducer(
        turnoCartReducer,
        initialState
    )

    const agregarTurno = (turno) => {
        dispatch({
            type: "ADD_TURNO",
            payload: turno
        })
    }

    const eliminarTurno = (turnoId) => {
        dispatch({
            type: "REMOVE_TURNO",
            payload: turnoId
        })
    }

    const limpiarTurnos = () => {
        dispatch({
            type: "CLEAR_TURNOS"
        })
    }

    return (
        <TurnoCartContext.Provider
            value={{
                turnos: state.turnos,
                cantidadTurnos:
                    state.turnos.length,
                agregarTurno,
                eliminarTurno,
                limpiarTurnos
            }}
        >
            {children}
        </TurnoCartContext.Provider>
    )
}