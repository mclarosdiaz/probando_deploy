import { NotAllowedError } from "../errors/appError.js";

export class NotificacionService {
  constructor(notificacionesRepository) {
    this.notificacionesRepository = notificacionesRepository;
  }

  async mostrarNotificaciones({ idUsuario, leidas }) {
    let leida;

    if (leidas === undefined) {
      leida = undefined;
    } else {
      leida = leidas === "true";
    }
    return await this.notificacionesRepository.obtenerNotificacionesDestinatario(
      { idDestinatario: idUsuario, leida: leidas },
    );
  }

  async marcarComoLeida({ idUsuario, idNotificacion }) {
    const notificacion =
      await this.notificacionesRepository.findById(idNotificacion);

    if (notificacion.destinatario.id !== idUsuario) {
      throw new NotAllowedError("La notificación no pertenece al usuario");
    }

    notificacion.marcarComoLeida();

    const notificacionGuardada = await this.notificacionesRepository.update(
      notificacion.id,
    );

    return notificacionGuardada;
  }
}
