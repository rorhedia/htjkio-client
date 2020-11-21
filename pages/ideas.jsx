import CustomNavbar from "../components/CustomNavbar";
import CardIdea from "../components/CardIdea";

import { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

export default function Ideas() {
  const [dropdownOpenStatus, setDropdownOpenStatus] = useState(false);
  const [dropdownOpenCoach, setDropdownOpenCoach] = useState(false);
  const [dropdownOpenAuthor, setDropdownOpenAuthor] = useState(false);

  const toggleDropdownStatus = () =>
    setDropdownOpenStatus((prevState) => !prevState);
  const toggleDropdowCoach = () =>
    setDropdownOpenCoach((prevState) => !prevState);
  const toggleDropdowAuthor = () =>
    setDropdownOpenAuthor((prevState) => !prevState);

  return (
    <div>
      <CustomNavbar />

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
          <CardIdea idea=''/>
        </div>
      </div>
    </div>
  );
}
