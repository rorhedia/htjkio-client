import { useState } from "react";

import CustomNavbar from "../../components/CustomNavbar";
import CardIdea from "../../components/CardIdea";

import { getIdeas, getCoaches, getUsers } from "../../lib/services";
import { redirectIfNotAuthenticated } from "../../lib/auth";
import { cookieDecode } from "../../lib/session";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

function Ideas({ ideas, coaches: { coaches }, users, user }) {
  const [dropdownOpenStatus, setDropdownOpenStatus] = useState(false);
  const [dropdownOpenCoach, setDropdownOpenCoach] = useState(false);
  const [dropdownOpenAuthor, setDropdownOpenAuthor] = useState(false);

  const [ideasList, setIdeasList] = useState(ideas);

  const toggleDropdownStatus = () =>
    setDropdownOpenStatus((prevState) => !prevState);
  const toggleDropdowCoach = () =>
    setDropdownOpenCoach((prevState) => !prevState);
  const toggleDropdowAuthor = () =>
    setDropdownOpenAuthor((prevState) => !prevState);

  const handleFilter = (filter) => {
    let newIdeas;

    console.log(filter, ideas);

    if (filter.key === "status") {
      newIdeas = ideas.filter(({ status }) => filter.value === status);
    } else if (filter.key === "coach") {
      newIdeas = ideas.filter(({ coach: { _id } }) => filter.value === _id);
    } else if (filter.key === "user") {
      newIdeas = ideas.filter(({ user: { _id } }) => filter.value === _id);
    }

    setIdeasList(newIdeas);
  };

  const emptyIdeas = (
    <div className="alert alert-warning" role="alert">
      No hay ideas para mostrar
    </div>
  );

  return (
    <div>
      <CustomNavbar user={user} />

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
                  <DropdownItem
                    onClick={() =>
                      handleFilter({ key: "status", value: "Aprobado" })
                    }
                  >
                    Aprobado
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      handleFilter({ key: "status", value: "Rechazado" })
                    }
                  >
                    Rechazado
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      handleFilter({ key: "status", value: "Pendiente" })
                    }
                  >
                    Pendiente
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Dropdown
                isOpen={dropdownOpenCoach}
                toggle={toggleDropdowCoach}
                className="mx-1"
              >
                <DropdownToggle caret>Coach</DropdownToggle>
                <DropdownMenu>
                  {coaches.length &&
                    coaches.map(({ name, lastname, _id }) => (
                      <DropdownItem
                        key={_id}
                        onClick={() =>
                          handleFilter({ key: "coach", value: _id })
                        }
                      >
                        {name} {lastname}
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </Dropdown>

              <Dropdown
                isOpen={dropdownOpenAuthor}
                toggle={toggleDropdowAuthor}
              >
                <DropdownToggle caret>Creado por</DropdownToggle>
                <DropdownMenu>
                  {users.length &&
                    users.map(({ name, lastname, _id }) => (
                      <DropdownItem
                        key={_id}
                        onClick={() =>
                          handleFilter({ key: "user", value: _id })
                        }
                      >
                        {name} {lastname}
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-3">
          {ideasList.length
            ? ideasList.map(({ _id, name, status, image }) => (
                <CardIdea
                  key={_id}
                  id={_id}
                  name={name}
                  status={status}
                  image={image}
                />
              ))
            : emptyIdeas}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  if (redirectIfNotAuthenticated(ctx)) {
    return { props: {} };
  }
  
  const cookie = cookieDecode("session", ctx.req);
  const user = cookie.user;
  const { jsonwebtoken, id } = cookie.user;
  console.log(cookie);

  const resultIdea = await getIdeas(jsonwebtoken);
  let ideas = resultIdea.status === "success" ? resultIdea.response.data : {};

  const resultCoach = await getCoaches(jsonwebtoken);
  let coaches = resultCoach.status === "success" ? resultCoach.response : {};

  const resultUsers = await getUsers(jsonwebtoken);
  let users = resultUsers.status === "success" ? resultUsers.response : {};

  return { props: { ideas, coaches, users, user } };
}

export default Ideas;
