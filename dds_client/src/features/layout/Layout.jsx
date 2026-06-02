import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header.jsx";
import Nav_bar from "../../components/header/Navbar.jsx";

const Layout = (/*{ carrito }*/) => {
    return (
        <>
          <Header username="Alumno/a de DDSO"></Header>
          <Nav_bar></Nav_bar>
          {/*<Navbar carrito={carrito}></Navbar>*/}
          <Outlet />
        </>
    );
};

export default Layout;