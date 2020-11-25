import redirect from "./redirect";
import { getCookie, removeCookie } from "./session";

export const signOut = (ctx = {}) => {
  if (process.browser) {
    removeCookie("session");
    redirect("/", ctx);
  }
};

export const getSession = (ctx) => {
  return getCookie("session", ctx.req);
};

export const isAuthenticated = (ctx) => !!getSession(ctx);

export const redirectIfAuthenticated = (ctx) => {
  if (isAuthenticated(ctx)) {
    redirect("/ideas", ctx);
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
