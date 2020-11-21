import { useRouter } from "next/router";
import { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

import { login } from "../lib/services";

export default function CustomNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const toggle = () => setIsOpen(!isOpen);
  const handleLogin = () => {
    login();
    console.log('object')
  };
  // const handleClick = (e) => {
  //   console.log(e);
  //   e.preventDefault();
  //   // router.push(href);
  // };

  return (
    <>
      {router.pathname == "/" ? (
        <header className="container-fluid bg-header">
          <nav className="row">
            <div className="col-12 col-md-6 legals-container">
              <a className="legals" href="#" target="_blank">
                Aviso de privacidad
              </a>
              <a className="legals" href="#" target="_blank">
                Términos y condiciones
              </a>
            </div>
            <div className="col-12 col-md-6 login-container">
              <button className="login" onClick={handleLogin}>
                Ingresar
              </button>
            </div>
          </nav>
        </header>
      ) : (
        <Navbar className="navbar-ideas-container" light expand="md">
          <NavbarBrand href="/">
            <img className="logo-ideas" src="/logo_footer.png" alt="logo" />
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="#">Mis Ideas</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Todas las Ideas</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Crear idea</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Cerrar sesión</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
          <img
            src="/download.jpeg"
            className="rounded-circle float-right"
            alt="logo"
          ></img>
        </Navbar>
      )}
    </>
  );
}
