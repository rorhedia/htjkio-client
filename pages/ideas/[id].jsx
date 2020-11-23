import { useState } from "react";

import CustomNavbar from "../../components/CustomNavbar";
import CardIdea from "../../components/CardIdea";

import { getIdeasById, getCoaches } from "../../lib/services";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

function Ideas({ ideas, coaches: { coaches }, users }) {
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
            </div>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-3">
          {ideasList.length
            ? ideasList.map(({ _id, name, status }) => (
                <CardIdea key={_id} id={_id} name={name} status={status} />
              ))
            : emptyIdeas}
        </div>
      </div>
    </div>
  );
}

Ideas.getInitialProps = async (ctx) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjY5NGRjYmE2MjUwMTBkNTAxNzU4ZCIsImlhdCI6MTYwNjA4MDAxOSwiZXhwIjoxNjA2MTY2NDE5fQ.Gk7mr_FY12ws5Tqa12JguCZIV3uwW_7M-8Xu4mT_HH0";

  const id = ctx.query.id;

  const resultIdea = await getIdeasById(token, id);
  console.log(resultIdea)
  let ideas = resultIdea.status === "success" ? resultIdea.response.data : {};

  const resultCoach = await getCoaches();
  let coaches = resultCoach.status === "success" ? resultCoach.response : {};

  return { ideas, coaches };
};

export default Ideas;
