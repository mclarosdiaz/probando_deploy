import { DisponibilidadHoraria } from "./disponibilidadHoraria"

export function horaAMinutos(horaStr){
        const [horas, minutos] = horaStri.split(":").map(Number)
        return horas * 60 + minutos
}

export function minutosAHora(minutos){
        const h = Math.floor(minutos / 60)
        const m = minutos % 60

        return `${h.toString().padStart(2,"0")}:${m.toString().padStart(2,"0")}`
}

export function fechaDesdeDisponibilidad(diaSemanaEnum, minutos, offsetSemanas = 0){
        const hoy = new Date()

        const diaActual = hoy.getDay()

        let diferencia = diaSemanaEnum - diaActual
        if(diferencia <= 0) diferencia += 7

        const fecha = new Date(hoy)
        fecha.setDate(hoy.getDate() + diferencia + offsetSemanas * 7)

        const horas = Math.floor(minutos / 60)
        const mins = minutos % 60

        fecha.setHours(horas, mins, 0, 0)

        return fecha
}