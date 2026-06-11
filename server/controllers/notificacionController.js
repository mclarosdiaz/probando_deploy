export class NotificacionController{
    
    constructor(notificacionService) {
        this.notificacionService = notificacionService
    }

    mostrarNotificaciones = async (req, res) => {
        const { idUsuario } = req.params
        const { leidas } = req.query

        const notificaciones = await this.notificacionService.mostrarNotificaciones({ idUsuario, leidas })
        res.status(200).json(notificaciones)
    }


    marcarComoLeida = async (req, res) => {

        const { idUsuario, idNotificacion } = req.params

        const data = await this.notificacionService.marcarComoLeida({ idUsuario, idNotificacion })
        res.status(200).json(data)

    }
}
