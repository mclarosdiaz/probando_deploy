import { useContext } from "react"
import { TurnoCartContext } from "../context/carritoTurnosContext.jsx"

export function useTurnoCart(){
    const context = useContext(
        TurnoCartContext
    )

    if(!context){
        throw new Error(
            "useTurnoCart debe usarse dentro de TurnoCartProvider"
        )
    }

    return context
}