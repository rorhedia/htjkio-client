import { useState } from "react";
import { useRouter } from "next/router";

import CustomNavbar from "../../components/CustomNavbar";

import { getIdeasById, updateStatusIdea, deleteIdea } from "../../lib/services";
import { cookieDecode } from "../../lib/session";
import { redirectIfNotAuthenticated } from "../../lib/auth";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

function Ideas({
  id,
  idea: {
    data: { description, effect, image, file, name, status },
  },
  user,
}) {
  const router = useRouter();

  const [dropdownStatus, setDropdownStatus] = useState(false);
  const [state, setState] = useState(status);
  const [message, showMessage] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const toggleDropdownStatus = () =>
    setDropdownStatus((prevState) => !prevState);

  const handleStatus = async (status) => {
    setState(status.status);

    const response = await updateStatusIdea(user.jsonwebtoken, id, status);

    if (response.status === "success") {
      showMessage({
        show: true,
        msg: "¡El estado de actualizó exitosamente!",
        type: "alert alert-success alert-dismissible fade show",
      });
    } else {
      showMessage({
        show: true,
        msg: response.response.message,
        type: "alert alert-danger alert-dismissible fade show",
      });
    }
  };

  const handleDelete = async () => {
    let value = confirm("¿Seguro que deseas eliminar esta idea?");

    if (value) {
      const response = await deleteIdea(user.jsonwebtoken, id);

      if (response.status === "success") {
        router.push("/ideas");
      } else {
        showMessage({
          show: true,
          msg: response.response.message,
          type: "alert alert-danger alert-dismissible fade show",
        });
      }
    }
  };

  let img =
    image ||
    "https://htjkio.s3.us-east-2.amazonaws.com/2020-11-24T02%3A35%3A24.414Z-default.png";

  return (
    <div>
      <CustomNavbar user={user} />
      <div className="container">
        <div className="row mt-5">
          <div className="col-12 d-flex justify-content-between">
            <Dropdown isOpen={dropdownStatus} toggle={toggleDropdownStatus}>
              <DropdownToggle caret>Estatus</DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  onClick={() => handleStatus({ status: "Pendiente" })}
                >
                  Pendiente
                </DropdownItem>
                <DropdownItem
                  onClick={() => handleStatus({ status: "Aprobado" })}
                >
                  Aprobar
                </DropdownItem>
                <DropdownItem
                  onClick={() => handleStatus({ status: "Rechazado" })}
                >
                  Rechazar
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            {file && (
              <a href={file}>
                <button className="btn btn-primary">Descargar archivo</button>
              </a>
            )}
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-12 ">
            {message.show && (
              <div className={message.type} role="alert">
                {message.msg}
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                  onClick={() => showMessage({ show: false })}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="row mt-5 d-flex justify-content-center">
          <div className="col-12 col-md-6">
            <div className="card-deck">
              <div className="card">
                <img className="card-img-top" src={img} alt="Card image cap" />
                <div className="card-body">
                  <h3 className="card-title">{name}</h3>
                  <h5 className="card-title">Descripción:</h5>
                  <p className="card-text">{description}</p>

                  <h5 className="card-title">Impacto:</h5>
                  <p className="card-text">{effect}</p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <small className="text-muted">{state}</small>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDelete}
                  >
                    Eliminar idea
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  if (redirectIfNotAuthenticated(ctx)) {
    return { props: {} };
  }

  const id = ctx.query.id;
  const cookie = cookieDecode("session", ctx.req);
  const user = cookie.user;
  const { jsonwebtoken } = cookie.user;

  const resultIdea = await getIdeasById(jsonwebtoken, id);
  let idea = resultIdea.status === "success" ? resultIdea.response : {};

  return { props: { id, idea, user } };
}

export default Ideas;
