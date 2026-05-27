import { response } from "express"
import { TurnoService } from "../services/turnoService.js"
import { BadRequestError } from "../errors/appError.js"
import { validateQuery } from "../middlewares/validate.js"


export class TurnoController {
    constructor(turnoService  =  new TurnoService()){
        this.turnoService = turnoService
    }

    //  Paciente
    reservar = async(req, res, next) =>{
        try {
            const { id } = req.params
            const{ pacienteId } = req.body

            const data = await this.turnoService.reservar({id, pacienteId})

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    cancelarTurno = async(req, res, next) =>{
        try {
            const { id } = req.params
            const { motivo, idUsuario } = req.body
            

            const data = await this.turnoService.cancelar({
                id, 
                motivo, 
                idUsuario})

            
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

            res.status(200).json(turnos)
        } catch (error) {
            next(error)
        }
    }

    marcarComoRealizado = async(req, res, next) =>{
        try {
            const { id } = req.params
            const { idUsuario } = req.body

            const data = await this.turnoService.marcarComoRealizado({id, idUsuario})
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    marcarComoConfirmado = async(req,res,next) =>{
        try{
            const { id } = req.params
            const { idUsuario } = req.body

            const data = await this.turnoService.marcarComoConfirmado({id, idUsuario})
            res.status(200).json(data)
        } catch(error) {
            next(error)
        }
    }

    generarTurnosDisponibles = async(req, res, next) =>{
        try {

            const turnos = await this.turnoService.generarTurnosDisponibles()
            
            res.status(200).json(turnos)
        } catch (error) {
            next(error)
        }
    }
    
    modificarFechaTurno = async(req, res, next) =>{
        try{
            const { id } = req.params
            const { idUsuario , nuevaFecha } = req.body
            
            const data = await this.turnoService.modificarFechaTurno({ 
                id, 
                idUsuario, 
                fecha: nuevaFecha })

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