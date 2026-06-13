import './Navbar.css'
import { Link } from 'react-router-dom';
import CarritoIndicador from './CarritoIndicador';
import { useState } from 'react'
import LoginCard from '../loginCard/LoginCard.jsx'

const Navbar = () =>{

    const [mostrarLogin, setMostrarLogin] = useState(false)

    return(
       <header className = "navbar-bg">
        <nav className = "navbar">
            <div className="navbar-seccon left">
                <button className="menu-icon">☰</button>
            </div>

            <div className = "navbar-seccion centro">
                <div className = "logo">
                    <Link to = {'/'}> <img src = "/images/osecroackLogo.png" alt = "logo" className = "logoHeader"></img> </Link>
                </div>
            </div>

            <div className="navbar-seccon right">
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