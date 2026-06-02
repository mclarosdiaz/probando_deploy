import './Navbar.css'
import { Link } from 'react-router-dom';

const Navbar = () =>{
    return(
       <header className = "navbar-bg">
        <nav className = "navbar">
            <div className="navbar-seccon left">
                <button className="menu-icon">☰</button>
            </div>

            <div className = "navbar-seccion centro">
                <div className = "titulo">
                    <Link to = {'/'}> <img src = "/images/logo.png" alt = "logo" className = "logoHeader"></img> </Link>
                </div>
            </div>

            <div className="navbar-seccon right">
                <button className="user-icon">👤</button>
            </div>
        </nav>
       </header> 
    );
};

export default Navbar;