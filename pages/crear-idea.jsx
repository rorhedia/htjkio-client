import { useState } from "react";
import { useForm } from "react-hook-form";

import CustomNavbar from "../components/CustomNavbar";

import { getCoaches, addIdea } from "../lib/services";

function CreateIdea({ coaches: { coaches } }) {
  const [message, showMessage] = useState({
    show: false,
    msg: "",
    type: "",
  });

  let dataIdea = {
    user: "5fb695cb2e4ffa112ed7cf08",
    coach: "",
    name: "",
    description: "",
    effect: "",
    image: "",
    file: "",
  };

  const { register, errors, handleSubmit } = useForm();

  const onSubmit = async (data, e) => {
    let request = {
      ...dataIdea,
      ...data,
    };

    const response = await addIdea(request);

    if (response.status === "success") {
      showMessage({
        show: true,
        msg: "¡La idea se guardo exitosamente!",
        type: "alert alert-success alert-dismissible fade show",
      });
    } else {
      showMessage({
        show: true,
        msg: response.response.message,
        type: "alert alert-danger alert-dismissible fade show",
      });
    }

    e.target.reset();
  };

  return (
    <>
      <CustomNavbar />

      <div className="container mt-5">
        <div className="row">
          <div className="col">
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
          <div className="col-12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-12 col-md-8">
                  <div className="form-group">
                    <label>Nombre de la idea*</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Escribe el nombre de la idea"
                      name="name"
                      ref={register({
                        required: {
                          value: true,
                          message: "El nombre de la idea es requerido",
                        },
                        maxLength: {
                          value: 60,
                          message: "No más de 60 carácteres!",
                        },
                        minLength: {
                          value: 3,
                          message: "Mínimo 3 carácteres",
                        },
                      })}
                    />
                    {errors.name && (
                      <span className="text-danger text-small d-block mb-2">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Describe tú idea*</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Describe lo que tú idea resuelve o mejora"
                      name="description"
                      ref={register({
                        required: {
                          value: true,
                          message: "La descripción es requerida",
                        },
                        minLength: {
                          value: 20,
                          message: "Mínimo 20 carácteres",
                        },
                      })}
                    />
                    {errors.description && (
                      <span className="text-danger text-small d-block mb-2">
                        {errors.description.message}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Elige tú coach</label>
                    <select
                      className="form-control"
                      name="coach"
                      ref={register({
                        required: {
                          value: true,
                          message: "Elige un coach",
                        },
                        minLength: {
                          value: 2,
                          message: "Elige un coach",
                        },
                      })}
                    >
                      <option value="">Elige un coach</option>
                      {coaches.length &&
                        coaches.map(({ name, lastname, _id }) => (
                          <option key={_id} value={_id}>
                            {name} {lastname}
                          </option>
                        ))}
                    </select>
                    {errors.coach && (
                      <span className="text-danger text-small d-block mb-2">
                        {errors.coach.message}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Describe el impacto de tú idea</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Describe el imacto que tendría tu idea"
                      name="effect"
                      ref={register({
                        required: {
                          value: true,
                          message: "El impacto de la idea es requerido",
                        },
                        minLength: {
                          value: 20,
                          message: "Mínimo 20 carácteres",
                        },
                      })}
                    />
                    {errors.effect && (
                      <span className="text-danger text-small d-block mb-2">
                        {errors.effect.message}
                      </span>
                    )}
                  </div>

                  <div className="custom-file">
                    <label className="custom-file-label">
                      Adjuntar archivo
                    </label>
                    <input
                      type="file"
                      className="custom-file-input"
                      id="validatedCustomFile"
                      name="file"
                    />
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="custom-file">
                    <label className="custom-file-label">
                      Dale una imagen a tu idea
                    </label>
                    <input
                      type="file"
                      className="custom-file-input"
                      id="image-idea"
                      name="image"
                    />
                  </div>
                </div>
              </div>
              <div className="row my-3 d-flex justify-content-center">
                <div className="col-12 col-md-6">
                  <button
                    type="submit"
                    className="btn btn-outline-success btn-block"
                  >
                    Crear idea
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

CreateIdea.getInitialProps = async (ctx) => {
  const result = await getCoaches();

  let coaches = result.status === "success" ? result.response : {};

  return { coaches };
};

export default CreateIdea;
