import { TurnoService } from "../services/turnoService.js"
import { BadRequestError } from "../errors/appError.js"
import { turnoMapper } from "../middlewares/mappers/turnoMapper.js"
import { notificacionMapper} from "../middlewares/mappers/notificacionMapper.js"

//TODO Implementar Generación de Turnos de forma Asíncrona
export class TurnoController {
    constructor(turnoService  =  new TurnoService()){
        this.turnoService = turnoService
    }

    //  Paciente
    reservar = async(req, res, next) =>{
        try {
            const { id } = req.params
            const{ pacienteId } = req.body

            const {turno, notificacion} = await this.turnoService.reservar({id, pacienteId})

            const data = {
                turno: turnoMapper.turnoToDTO(turno),
                notificacion: notificacionMapper.notificacionToDTO(notificacion)
            }

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    cancelarTurno = async(req, res, next) =>{
        try {
            const { id } = req.params
            const { motivo, idUsuario } = req.body
            

            const {turno, notificacion} = await this.turnoService.cancelar({
                id, 
                motivo, 
                idUsuario})

            const data = {
                turno: turnoMapper.turnoToDTO(turno),
                notificacion: notificacionMapper.notificacionToDTO(notificacion)
            }

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    obtenerHistorialTurnos = async(req, res, next) =>{
        try {
            const { pacienteId,
                estado,
                fechaDesde,
                fechaHasta,
                page,
                limit } = req.query

            const {turnos, totalPages, total} = await this.turnoService.obtenerHistorial({
                filtros: {
                    pacienteId,
                    estado,
                    fechaDesde,
                    fechaHasta
                },
                page, 
                limit
            })

            res.status(200).json({
                turnos: turnos.map(turno => turnoMapper.turnoToDTO(turno)),
                paginacion: {
                    page,
                    limit,
                    total: total,
                    totalPages: totalPages,

                }
            })

            
        } catch (error) {
            next(error)
        }
    }

    buscarTurnosDisponibles = async(req, res, next) =>{
        try{
            const{ idPaciente } = req.params

            const{ page, limit } = req.query;

            const{ 
                idMedico,
                idEspecialidad,
                idPractica,
                idSede,
                fechaDesde,
                fechaHasta } = req.body

            const {turnosConCobertura, paginacion} = await this.turnoService.buscarTurnosDisponibles({
                idPaciente: idPaciente,
                filtros:{
                    idMedico,
                    idEspecialidad,
                    idPractica,
                    idSede,
                    fechaDesde,
                    fechaHasta
                },
                paginacion:{
                    page,
                    limit
                }
            })

            const data = {
                turnosConCobertura : turnosConCobertura, 
                paginacion: paginacion}

            res.status(200).json(data)
        }catch(error){
            next(error);
        }
    }
    
    marcarComoRealizado = async(req, res, next) =>{
        try {
            const { id } = req.params
            const { idUsuario } = req.body

            const turno = await this.turnoService.marcarComoRealizado({id, idUsuario})

            const data = turnoMapper.turnoToDTO(turno)

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    marcarComoConfirmado = async(req,res,next) =>{
        try{
            const { id } = req.params
            const { idUsuario } = req.body

            const {turno, notificacion} = await this.turnoService.marcarComoConfirmado({id, idUsuario})

            const data = {
                turno: turnoMapper.turnoToDTO(turno),
                notificacion: notificacionMapper.notificacionToDTO(notificacion)
            }

            res.status(200).json(data)
        } catch(error) {
            next(error)
        }
    }

    generarTurnosDisponibles = async(req, res, next) =>{
        try {

            const turnosGuardados = await this.turnoService.generarTurnosDisponibles()

            const data = turnosGuardados.map(turno => turnoMapper.turnoToDTO(turno))
            
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    
    modificarFechaTurno = async(req, res, next) =>{
        try{
            const { id } = req.params
            const { idUsuario , nuevaFecha } = req.body
            
            const {turno, notificacion} = await this.turnoService.modificarFechaTurno({ 
                id, 
                idUsuario, 
                fecha: nuevaFecha })

            const data = {
                turno: turnoMapper.turnoToDTO(turno),
                notificacion: notificacionMapper.notificacionToDTO(notificacion)
            }

            res.status(200).json(data)
        }catch(error){
            next(error)
        }
    }

    extraerPaginacion(query){
        const numPag = query?.page === undefined ? 1 : Number(query.page)
        const limPag = query?.limit === undefined ? 10 : Number(query.limit)
        
        this.validarEnteroPositivo(numPag, "page")
        this.validarEnteroPositivo(limPag, "limit")

        return { numPag, limPag }
    }

    validarEnteroPositivo(numero, parametro){
        if(!Number.isInteger(numero) || numero <= 0){
            throw new BadRequestError(`El parámetro ${parametro} debe ser un entero positivo`)
        }
    }


}