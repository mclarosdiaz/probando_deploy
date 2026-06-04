import { especialidadMapper } from "../middlewares/mappers/especialidadMapper";
import { practicaMapper } from "../middlewares/mappers/practicaMapper";
import { disponibilidadHorariaMapper } from "../middlewares/mappers/disponibilidadHorariaMapper";
import { medicoMapper } from "../middlewares/mappers/medicoMapper";
import { Practica } from "../domain/practica.js";
import { Especialidad } from "../domain/especialidad.js";

export class MedicoController {
  //TODO Implementar biblioteca de Try-Catch de Gastón
  constructor(medicoService) {
    this.medicoService = medicoService;
  }
  consultarDisponibilidades = async (req, res, next) => {
    try {
      const { idMedico } = req.params;
      const { tipoServicio, idServicio } = req.body;

      const disponibilidades =
        await this.medicoService.consultarDisponibilidades({
          idMedico,
          tipoServicio,
          idServicio,
        });

      const disponibilidadesDTO = disponibilidades.map((disponibilidad) =>
        disponibilidadHorariaMapper.disponibilidadHorariaToDTO(disponibilidad),
      );

      res.status(200).json(disponibilidadesDTO);
    } catch (error) {
      next(error);
    }
  };

  modificarDisponibilidades = async (req, res, next) => {
    try {
      const { idMedico } = req.params;
      const { nuevasDisponibilidadesDTO } = req.body;

      const nuevasDisponibilidades = nuevasDisponibilidadesDTO.map((dto) =>
        disponibilidadHorariaMapper.dtoToDisponibilidadHoraria(dto),
      );

      const medicoActualizado =
        await this.medicoService.modificarDisponibilidades({
          idMedico,
          nuevasDisponibilidades,
        });

      const medicoDTO = medicoMapper.medicoToDTO(medicoActualizado);

      res.status(200).json(medicoDTO);
    } catch (error) {
      next(error);
    }
  };

  agregarServicio = async (req, res, next) => {
    try {
      const { idMedico } = req.params;
      const { tipoServicio, nuevoServicioDTO } = req.body;

      let nuevoServicio = undefined;

      if (tipoServicio === "practica") {
        nuevoServicio = new Practica(
          nuevoServicioDTO.id,
          nuevoServicioDTO.codigo,
          nuevoServicioDTO.nombre,
          nuevoServicioDTO.duracionTurnoEnMins,
          nuevoServicioDTO.costo,
        );
      } else {
        nuevoServicio = new Especialidad(
          nuevoServicioDTO.id,
          nuevoServicioDTO.nombre,
          nuevoServicioDTO.duracionTurnoEnMins,
          nuevoServicioDTO.costo,
        );
      }

      const medicoActualizado = await this.medicoService.agregarServicio({
        idMedico,
        tipoServicio,
        nuevoServicio,
      });

      const medicoDTO = medicoMapper.medicoToDTO(medicoActualizado);

      res.status(200).json(medicoDTO);
    } catch (error) {
      next(error);
    }
  };

  eliminarServicio = async (req, res, next) => {
    try {
      console.log("PARAMS:", req.params) 
      const { idMedico, tipo, idServicio } = req.params;

      const medicoActualizado = await this.medicoService.eliminarServicio({
        idMedico,
        tipoServicio: tipo,
        idServicio,
      });
      const medicoDTO = medicoMapper.medicoToDTO(medicoActualizado);

      res.status(200).json(medicoDTO);
    } catch (error) {
      next(error);
    }
  };

  modificarServicio = async (req, res, next) => {
    const { idMedico, tipo, idServicio } = req.params;
    const servicioModificado = req.body;

    try {
      const medicoActualizado = await this.medicoService.modificarServicio({
        idMedico,
        tipoServicio: tipo,
        idServicio,
        servicioModificado,
      });
      res.status(200).json(medicoActualizado);
    } catch (error) {
      next(error);
    }
  };
}
