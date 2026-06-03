export class NotificacionController{
    
    constructor(notificacionService){
        this.notificacionService= notificacionService
    }
    
    mostrarNotificaciones = async(req, res, next) =>{
        try {
            const { idUsuario } = req.params
            const { leidas } = req.query

            const notificaciones = await this.notificacionService.mostrarNotificaciones({ idUsuario, leidas })
            res.status(200).json(notificaciones)
        }
        catch (error) {
            next(error)
        }
    }

    marcarComoLeida = async(req,res,next)=>{
        try{
            const { idUsuario, idNotificacion } = req.params

            const data = await this.notificacionService.marcarComoLeida({idUsuario, idNotificacion})
            res.status(200).json(data)
        }
        catch(error)
        {
            next(error)
        }
    }
}