import cookie from "js-cookie";
import { Base64 } from "js-base64";

export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
      path: "/",
    });
  }
};

export const removeCookie = (key) => {
  console.log(process.browser, key);
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

export const getCookie = (key, req) => {
  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req);
};

const getCookieFromBrowser = (key) => {
  console.log('a');
  return cookie.get(key);
};

const getCookieFromServer = (key, req) => {
  console.log('b');
  if (!req.headers.cookie) {
    return undefined;
  }
console.log('c');
  const rawCookie = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith(`${key}=`));
console.log('d');
  if (!rawCookie) {
    return undefined;
  }
console.log('e');
  return rawCookie.split("=")[1];
};

export const cookieDecode = (key, req) => {
  let result = getCookie(key, req);
  return JSON.parse(Base64.decode(result));
};
