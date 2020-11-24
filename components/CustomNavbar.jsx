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

export default function CustomNavbar({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const toggle = () => setIsOpen(!isOpen);

  const handleLogin = () => {
    // router.push("https://htj-kio.herokuapp.com/auth/login");
    router.push("http://localhost:3000/auth/login");
  };

  return (
    <>
      {router.pathname == "/" ? (
        <header className="container-fluid bg-header">
          <nav className="row">
            <div className="col-12 col-md-6 legals-container">
              <a
                className="legals"
                href="/avisodeprivacidad.pdf"
                target="_blank"
              >
                Aviso de privacidad
              </a>
              <a
                className="legals"
                href="/terminosycondiciones.pdf"
                target="_blank"
              >
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
                <NavLink onClick={() => router.push("/mis-ideas")}>
                  Mis Ideas
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => router.push("/ideas")}>
                  Todas las Ideas
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => router.push("/crear-idea")}>
                  Crear idea
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  onClick={() =>
                    router.push("http://localhost:3000/auth/logout")
                  }
                >
                  Cerrar sesión
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
          <img
            src={user.picture}
            className="rounded-circle float-right"
            alt="logo"
          ></img>
        </Navbar>
      )}
    </>
  );
}
