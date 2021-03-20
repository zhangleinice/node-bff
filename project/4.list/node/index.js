const app = new (require("koa"))();
const mount = require("koa-mount");
const static = require("koa-static");
const getData = require("./get_data.js");
const ReactDomServer = require("react-dom/server");
const App = require("./app.jsx");

const template = require("./template")(__dirname + "/index.html");

require("babel-register")({
  presets: ["react"],
});

app.use(mount("/static", static(__dirname + "./source")));

app.use(
  mount("/data", async (ctx) => {
    ctx.body = await getData(+(ctx.query.sort || 0), +(ctx.query.filt || 0));
  })
);

app.use(async (ctx) => {
  ctx.status = 200;
  const filtType = +(ctx.query.filt || 0);
  const sortType = +(ctx.query.sort || 0);
  const reactData = await getData(sortType, filtType);

  ctx.body = template({
    reactString: ReactDomServer.renderToString(App(reactData)),
    reactData,
    filtType,
    sortType,
  });
});

app.listen(3002);

module.exports = app;
