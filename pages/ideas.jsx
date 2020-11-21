import { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

export default function Ideas() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpenStatus, setDropdownOpenStatus] = useState(false);
  const [dropdownOpenCoach, setDropdownOpenCoach] = useState(false);
  const [dropdownOpenAuthor, setDropdownOpenAuthor] = useState(false);
  const [activeLink, setActiveLink] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const toggleDropdownStatus = () =>
    setDropdownOpenStatus((prevState) => !prevState);
  const toggleDropdowCoach = () =>
    setDropdownOpenCoach((prevState) => !prevState);
  const toggleDropdowAuthor = () =>
    setDropdownOpenAuthor((prevState) => !prevState);

  return (
    <div>
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

      <div className="container">
        <div className="row">
          <div className="col-12 ">
            <div className="filters-container">
              <Dropdown
                isOpen={dropdownOpenStatus}
                toggle={toggleDropdownStatus}
              >
                <DropdownToggle caret>Estatus</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Bar Action</DropdownItem>
                  <DropdownItem>Quo Action</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Dropdown isOpen={dropdownOpenCoach} toggle={toggleDropdowCoach}>
                <DropdownToggle caret>Coach</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Bar Action</DropdownItem>
                  <DropdownItem>Quo Action</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Dropdown
                isOpen={dropdownOpenAuthor}
                toggle={toggleDropdowAuthor}
              >
                <DropdownToggle caret>Creado por</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Bar Action</DropdownItem>
                  <DropdownItem>Quo Action</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-3">
          <div className="col mb-4">
            <div className="card">
              <img src="download.jpeg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
              </div>
            </div>
          </div>
          <div className="col mb-4">
            <div className="card">
              <img src="download.jpeg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
              </div>
            </div>
          </div>
          <div className="col mb-4">
            <div className="card">
              <img src="download.jpeg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
              </div>
            </div>
          </div>
          <div className="col mb-4">
            <div className="card">
              <img src="download.jpeg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
