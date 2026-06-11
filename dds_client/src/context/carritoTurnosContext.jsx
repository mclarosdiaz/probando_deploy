import { createContext, useReducer } from "react"

export const TurnoCartContext = createContext()

const initialState = {
    turnos: []
}

function turnoCartReducer(state, action) {

    switch (action.type) {

        case "ADD_TURNO": {

            const turnoYaExiste =
                state.turnos.some(
                    turno =>
                        turno.id === action.payload.id
                )

            if (turnoYaExiste) {
                return state
            }

            return {
                ...state,
                turnos: [
                    ...state.turnos,
                    action.payload
                ]
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