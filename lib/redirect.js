import Router from "next/router";

const redirect = (target, ctx = {}) => {
  console.log(4);
  console.log(ctx.res);
  if (ctx.res) {
    console.log(5);
    ctx.res.writeHead(303, { Location: "https://htjkio.vercel.app/" + target });
    ctx.res.end();
  } else {
    console.log(6);
    Router.replace(target);
  }
};

export default redirect;
