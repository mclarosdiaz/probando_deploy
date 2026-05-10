import { response } from "express"
import { TurnoService } from "../services/turnoService.js"
import { BadRequestError } from "../errors/appError.js"
import { validateQuery } from "../middlewares/validate.js"


export class TurnoController {
    constructor({ turnoService  =  new TurnoService() } = {}){
        this.turnoService = turnoService
    }

    //  Paciente
    reservar = async(req, res, next) =>{
        try {
            const { id } = req.params
            const{ pacienteId } = req.body

            const turno = await this.turnoService.reservar({id, pacienteId})

            res.status(200).json(turno)
        } catch (error) {
            next(error)
        }
    }

    cancelarTurno = async(req, res, next) =>{
        try {
            const { id } = req.params
            const { motivo } = req.body
            const { idUsuario } = req.query

            await this.turnoService.cancelar({
                id, 
                motivo, 
                idUsuario})

            res.sendStatus(204)
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

            const turnos = await this.turnoService.obtenerHistorial({ 
            filtros:{
                pacienteId, 
                estado,
                fechaDesde,
                fechaHasta
            },
            paginacion:{
                page,
                limit
            }
        })

            res.json(turnos)
        } catch (error) {
            next(error)
        }
    }

    marcarComoRealizado = async(req, res, next) =>{
        try {
            const { id } = req.params
            const { idUsuario } = req.query

            await this.turnoService.marcarComoRealizado({id, idUsuario})
        } catch (error) {
            next(error)
        }
    }

    marcarComoConfirmado = async(req,res,next) =>{
        try{
            const { id } = req.params
            const { idUsuario } = req.query

            await this.turnoService.marcarComoConfirmado({id, idUsuario})
        } catch(error) {
            next(error)
        }
    }

    generarTurnosDisponibles = async(req, res, next) =>{
        try{
        
            await this.turnoService.generarTurnosDisponibles()

        }catch(error)
            {
                next(error)
            }
    }
    
    modificarFechaTurno = async(req, res, next) =>{
        try{
            const { id } = req.params
            const { idUsuario , nuevaFecha } = req.body
            
            await this.turnoService.modificarFechaTurno({ 
                id, 
                idUsuario, 
                fecha: nuevaFecha })
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