import './Navbar.css'
import { Link } from 'react-router-dom';
import CarritoIndicador from './CarritoIndicador.jsx';
import logo from '../../assets/osecroacklogo.png'
import { useState } from 'react'
import LoginCard from '../loginCard/LoginCard.jsx'


const Navbar = () => {

    const [mostrarLogin, setMostrarLogin] = useState(false)

    return (
        <header className="navbar-bg">
            <nav className="navbar">
                <div className="navbar-seccion left">
                    <button className="menu-icon">☰</button>
                </div>

                <div className="navbar-seccion centro">
                    <div className="logo">
                        <Link to={'/'}> <img src= {logo} className="logoHeader"></img> </Link>
                    </div>
                </div>

                <div className="navbar-seccion right">
                    <CarritoIndicador />

                    <div className="user-container">

                        <button className="user-icon" onClick={() => setMostrarLogin(!mostrarLogin)}>
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
                </div>
            </nav>
        </header>
    );
};

export default Navbar;