import React, { useState } from 'react';
import { mockNotificaciones } from '../../mockdata/Notificaciones';
import './NotificacionesPage.css';

const NotificacionesPage = () => {
    // Iniciamos el estado local con nuestros datos de mentira
    const [notificaciones, setNotificaciones] = useState(mockNotificaciones);

    // Filtramos para cumplir con los requerimientos de la cátedra
    const noLeidas = notificaciones.filter(notif => !notif.leida);
    const leidas = notificaciones.filter(notif => notif.leida);

    // Función para actualizar el estado (simulando el endpoint)
    const handleMarcarLeida = (id) => {
        const estadoActualizado = notificaciones.map(notif => {
            if (notif.id === id) {
                return { ...notif, leida: true, fechaHoraLeida: new Date().toISOString() };
            }
            return notif;
        });
        setNotificaciones(estadoActualizado);
    };

    return (
        <div className="notificaciones-page-container">
            <h2>Mis Notificaciones</h2>

            <section className="notificaciones-seccion">
                <h3>Sin Leer ({noLeidas.length})</h3>
                {noLeidas.length === 0 ? (
                    <p>No tenés notificaciones nuevas.</p>
                ) : (
                    <div className="notificaciones-lista">
                        {noLeidas.map(notif => (
                            <div key={notif.id} className="notificacion-card no-leida">
                                <div className="notificacion-header">
                                    <strong>De: {notif.remitente}</strong>
                                    <span>{new Date(notif.fechaHoraCreacion).toLocaleDateString('es-AR')}</span>
                                </div>
                                <p>{notif.mensaje}</p>
                                <button 
                                    className="btn-marcar-leida"
                                    onClick={() => handleMarcarLeida(notif.id)}
                                >
                                    Marcar como leída
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <hr className="separador-seccion" />

            <section className="notificaciones-seccion">
                <h3>Leídas</h3>
                {leidas.length === 0 ? (
                    <p>No hay notificaciones en el historial.</p>
                ) : (
                    <div className="notificaciones-lista">
                        {leidas.map(notif => (
                            <div key={notif.id} className="notificacion-card leida">
                                <div className="notificacion-header">
                                    <strong>De: {notif.remitente}</strong>
                                    <span>{new Date(notif.fechaHoraCreacion).toLocaleDateString('es-AR')}</span>
                                </div>
                                <p>{notif.mensaje}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default NotificacionesPage;