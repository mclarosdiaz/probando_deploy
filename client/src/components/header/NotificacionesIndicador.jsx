import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa'; 
import { mockNotificaciones } from '../../mockdata/Notificaciones';
import './NotificacionesIndicador.css';

const NotificacionesIndicador = () => {
    
    // calcula no leídas
    const cantidadSinLeer = mockNotificaciones.filter(notif => !notif.leida).length;

    return (
        <Link 
            to={'/notificaciones'} 
            className="notificaciones-link"
        >
            <div className="notificaciones-contenedor">
                <div className="icono-wrapper">
                    
                    <FaBell className="notificaciones-icono" size={24} color= "rgba(65,139,24,1.000)" />
                    
                    {cantidadSinLeer > 0 && (
                        <span className="notificaciones-badge">
                            {cantidadSinLeer}
                        </span>
                    )}
                    
                </div>
            </div>
        </Link>
    );
};

export default NotificacionesIndicador;