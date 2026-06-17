import './Navbar.css'
import { Link } from 'react-router-dom';
import CarritoIndicador from './CarritoIndicador.jsx';
import NotificacionesIndicador from './NotificacionesIndicador';
import logo from '../../assets/osecroacklogo.png'
import { useState } from 'react'
import LoginCard from '../loginCard/LoginCard.jsx'
import SearchIcon from '@mui/icons-material/Search';

import HistoryIcon from '@mui/icons-material/History';

const Navbar = () => {

    const [mostrarLogin, setMostrarLogin] = useState(false)

 
    return (
        <header className="navbar-bg">
            <nav className="navbar">

                 

                <div className="navbar-seccion left">

                    <div className="logo">
                        <Link to={'/'}
                        aria-label="Inicio"
                        title="Inicio"
                        > <img src={logo} className="logoHeader" alt="Logo OSECROACK"></img> </Link>
                    </div>

                    <Link to="/servicios" className='nav-link'>
                        Servicios
                    </Link>

                    <Link to="/medicos" className='nav-link'>
                        Medicos
                    </Link>

                    <Link to='/como-funciona' className='nav-link optional-link'>
                        Cómo funciona
                    </Link>


                </div>

                <div className='navbar-seccion centro'>
                    <div className="quick-actions">

                        <Link
                            to="/busquedaDeTurnos"
                            className="action-button"
                        >

                            <SearchIcon className="action-icon" />

                            <span className="action-text">
                                Buscar Turnos
                            </span>

                        </Link>

                        <Link
                            to="/historialDeTurnos"
                            className="action-button secondary"
                        >

                            <HistoryIcon className="action-icon" />

                            <span className="action-text">
                                Historial
                            </span>

                        </Link>

                    </div>

                </div>
                
                <div className="navbar-seccion right">

                    <CarritoIndicador />
                    
                    <div className='search-container'>
                        <input 
                            type="text"
                            placeholder='Buscar médico o especialidad...'
                            className='search-input'
                        />
                    </div>

                    <div className="user-container">

                    <button className="user-icon" onClick={() =>{ 
                            console.log('click');
                            console.log(mostrarLogin)
                            setMostrarLogin(prev => !prev)}
                    }
                            aria-label="Abrir menú de usuario"
                            title="Abrir menú de usuario"
                        >
                            👤
                        </button>

                        {mostrarLogin && (
                            <LoginCard
                                onClose={() =>
                                    setMostrarLogin(false)
                                }
                            />
                        )}

                    </div>

                    <NotificacionesIndicador />
                </div>
            </nav>
        </header>
    );
};
export default Navbar;