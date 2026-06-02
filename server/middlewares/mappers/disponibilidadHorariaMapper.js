import { DisponibilidadHoraria } from "./disponibilidadHorariaMapper"

export { DisponibilidadHoraria } from "../../domain/disponibilidadHoraria"

class DisponibilidadHorariaMapper{

    dtoToDisponibilidadHoraria(dto){    
        return new DisponibilidadHoraria(
            dto.diaSemana,
            dto.horaDesde,
            dto.horaHasta
        )
    }

    disponibilidadHorariaToDTO(disponibilidadHoraria){
        return{
            diaSemana: disponibilidadHoraria.diaSemana,
            horaDesde: disponibilidadHoraria.horaDesde,
            horaHasta: disponibilidadHoraria.horaHasta
        }
    }
}

export const disponibilidadHorariaMapper = new DisponibilidadHorariaMapper()