import redirect from "./redirect";
import { getCookie, removeCookie } from "./session";

// const URL_BASE = "https://del-campo-api.mybluemix.net/";
// const URL_BASE_DEV = "http://localhost:8080/";

/**
 * CREAR NUEVO USUARIO
 *
 * @param {*} request
 */
// export const signUp = async (request) => {
//   const response = await fetch(`${URL_BASE}auth/sign-up`, {
//     method: "POST",
//     body: JSON.stringify(request),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const result = await response.json();

//   return result;
// };

/**
 * INICIO DE SESIÓN
 *
 * @param {*} request
 */
// export const signIn = async (request) => {
//   const response = await fetch(`${URL_BASE}auth/sign-in`, {
//     method: "POST",
//     body: JSON.stringify(request),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const result = await response.json();

//   return result;
// };

/**
 * COMPROBACION DE SESIÓN
 *
 * @param {*} request
 */
// export const session = async (token) => {
//   const response = await fetch(`${URL_BASE}auth/session`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token,
//     },
//   });
//   const result = await response.json();

//   return result;
// };

export const signOut = (ctx = {}) => {
  if (process.browser) {
    removeCookie("session");
    redirect("/login", ctx);
  }
};

export const getSession = (ctx) => {
  return getCookie("session", ctx.req);
};

export const isAuthenticated = (ctx) => !!getSession(ctx);

export const redirectIfAuthenticated = (ctx) => {
  if (isAuthenticated(ctx)) {
    redirect("/home", ctx);
    return true;
  }
  return false;
};

export const redirectIfNotAuthenticated = (ctx) => {
  if (!isAuthenticated(ctx)) {
    redirect("/", ctx);
    return true;
  }
  return false;
};
