import { useState } from "react";
import { useForm } from "react-hook-form";

import CustomNavbar from "../components/CustomNavbar";

import { redirectIfNotAuthenticated } from "../lib/auth";
import { cookieDecode } from "../lib/session";
import {
  getCoaches,
  addIdea,
  upload,
  uploadImage,
  uploadFile,
} from "../lib/services";

function CreateIdea({ coaches: { coaches }, user }) {
  const [message, showMessage] = useState({
    show: false,
    msg: "",
    type: "",
  });

  let dataIdea = {
    user: user.id,
    coach: "",
    name: "",
    description: "",
    effect: "",
    image: "",
    file: "",
  };

  const { register, errors, handleSubmit } = useForm();

  const onSubmit = async (data, e) => {
    let formdata = new FormData();
    let imageResult, fileResult, uploadResult;

    data.image = !data.image.length ? "" : data.image;
    data.file = !data.file.length ? "" : data.file;

    if (data.image.length && data.file.length) {
      formdata.append("image", data.image[0], data.image[0].name);
      formdata.append("file", data.file[0], data.file[0].name);
      uploadResult = await upload(user.jsonwebtoken, formdata);

      if (uploadResult.success === true) {
        data["image"] = uploadResult.data.image.url;
        data["file"] = uploadResult.data.file.url;
      }
    } else if (data.image.length) {
      formdata.append("image", data.image[0], data.image[0].name);
      imageResult = await uploadImage(user.jsonwebtoken, formdata);

      if (imageResult.success === true) {
        data["image"] = imageResult.data.url;
      }
    } else if (data.file.length) {
      formdata.append("file", data.file[0], data.file[0].name);
      fileResult = await uploadFile(user.jsonwebtoken, formdata);

      if (fileResult.success === true) {
        data["file"] = fileResult.data.url;
      }
    }

    let request = {
      ...dataIdea,
      ...data,
    };

    const response = await addIdea(user.jsonwebtoken, request);

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
      <CustomNavbar user={user} />

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
            <form
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
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
                      name="file"
                      ref={register}
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
                      name="image"
                      ref={register}
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

export async function getServerSideProps(ctx) {
  if (redirectIfNotAuthenticated(ctx)) {
    return { props: {} };
  }

  const cookie = cookieDecode("session", ctx.req);
  const user = cookie.user;
  const { jsonwebtoken, id } = cookie.user;

  const result = await getCoaches(jsonwebtoken);

  let coaches = result.status === "success" ? result.response : {};

  return {
    props: { coaches, user },
  };
}

export default CreateIdea;
