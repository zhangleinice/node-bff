const koa = require("koa");
const fs = require("fs");
// 路由中间件
const mount = require("koa-mount");
/**
 * 静态文件中间件
 * 原理：根据文件后缀名设置请求头 「Content-Type」值，使之与浏览器渲染相匹配！
 * 寻找 static/css/xxx.css 是否存在
 *（若存在）设置 Content-Type: text/css;charset=utf-8;
 * 记得看源码
 */
const static = require("koa-static");

const app = new koa();

app.use(static(__dirname + "/source/"));

app.use(
  mount("/", async (ctx) => {
    ctx.body = fs.readFileSync(__dirname + "/source/index.html", "utf-8");
  })
);

app.listen(4000);

module.exports = app;
