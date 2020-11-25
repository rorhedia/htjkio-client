import redirect from "./redirect";
import { getCookie, removeCookie } from "./session";

export const signOut = (ctx = {}) => {
  if (process.browser) {
    removeCookie("session");
    redirect("/", ctx);
  }
};

export const getSession = (ctx) => {
  console.log(3);
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
  console.log(1);
  if (!isAuthenticated(ctx)) {
    console.log(2);
    redirect("/", ctx);
    return true;
  }
  console.log('2a');
  return false;
};
