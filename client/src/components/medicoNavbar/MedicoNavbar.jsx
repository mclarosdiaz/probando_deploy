import './MedicoNavbar.css'

import { Link } from 'react-router-dom'

import EventNoteIcon from '@mui/icons-material/EventNote'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import ScheduleIcon from '@mui/icons-material/Schedule'

import logo from '../../assets/osecroacklogo.png'

import { useAuth } from '../../context/AuthContext'

import NotificacionesIndicador from '../header/NotificacionesIndicador'

export default function MedicoNavbar() {

    const { user, logout } = useAuth()

    return (
        <nav className="medico-navbar">

            <div className="medico-navbar-left">

                <Link to="/medico">
                    <img
                        src={logo}
                        alt="Logo"
                        className="logoHeader"
                    />
                </Link>

                <Link
                    to="/medico"
                    className="medico-link"
                >
                    <EventNoteIcon />
                    Agenda
                </Link>

                <Link
                    to="/dh"
                    className="medico-link"
                >
                    <ScheduleIcon />
                    Disponibilidad
                </Link>

                <Link
                    to="/gs"
                    className="medico-link"
                >
                    <MedicalServicesIcon />
                    Servicios
                </Link>

            </div>

            <div className="medico-navbar-right">

                <NotificacionesIndicador />

                <button
                    onClick={logout}
                >
                    Cerrar sesión
                </button>

            </div>

        </nav>
    )
}