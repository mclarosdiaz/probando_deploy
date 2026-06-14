import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header.jsx";
import Navbar from "../../components/header/Navbar.jsx";
import Footer from "../../components/footer/Footer.jsx";
import "./Layout.css";

const Layout = (/*{ carrito }*/) => {
    return (
        <div className="layout-container">
          <Header username="Alumno/a de DDSO"></Header>
          <Navbar></Navbar>
          {/*<Navbar carrito={carrito}></Navbar>*/}
          
          <main className="main-content">
            <Outlet />
          </main>

          <Footer />
        </div>
    );
};

export default Layout;