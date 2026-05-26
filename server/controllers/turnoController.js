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

            const turno = await this.turnoService.reservar({id, pacienteId})

            res.status(200).json(turno)
        } catch (error) {
            next(error)
        }
    }

    cancelarTurno = async(req, res, next) =>{
        try {
            const { id } = req.params
            const { motivo, idUsuario } = req.body
            

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

            const {turnos, total} = await this.turnoService.obtenerHistorial({ 
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
                page = Number(page) || 1;
                limit = Number(limit) || 10;
                const totalPages = Math.ceil(total / limit);

            res.status(200).json({
                data: turnos,
                paginacion:{
                page: page,
                totalPages: totalPages,
                total: total}
            })

        } catch (error) {
            next(error)
        }
    }

    buscarTurnosDisponibles = async(req, res, next) =>{
        try{

            // 🕵️ RADAR 3: Controlador
            console.log(`⚙️ [Controller] Entrando a buscarTurnosDisponibles`);
            console.log(`⚙️ [Controller] req.params:`, req.params);
            console.log(`⚙️ [Controller] req.query:`, req.query);
            console.log(`⚙️ [Controller] req.body:`, req.body);

            const{ idPaciente } = req.params

            const{ page, limit } = req.query;

            const{ 
                idMedico,
                idEspecialidad,
                idPractica,
                idSede,
                fechaDesde,
                fechaHasta } = req.body

            const turnos = await this.turnoService.buscarTurnosDisponibles({
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

            res.status(200).json(turnos)
        }catch(error){
            next(error);
        }
    }

    marcarComoRealizado = async(req, res, next) =>{
        try {
            const { id } = req.params
            const { idUsuario } = req.body

            await this.turnoService.marcarComoRealizado({id, idUsuario})
            res.sendStatus(200)
        } catch (error) {
            next(error)
        }
    }

    marcarComoConfirmado = async(req,res,next) =>{
        try{
            const { id } = req.params
            const { idUsuario } = req.body

            await this.turnoService.marcarComoConfirmado({id, idUsuario})

            res.sendStatus(200)
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
            
            await this.turnoService.modificarFechaTurno({ 
                id, 
                idUsuario, 
                fecha: nuevaFecha })

            res.sendStatus(200)
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