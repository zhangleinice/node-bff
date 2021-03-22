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

/**
 * 1.根据性能监控结果优化，避免每次都重新读取
 * 2.提前把文件系统中的内容读取到内存中，中间件里是从内存中取得模板内容
 * 从硬盘文件中取和从内存中取，肯定是内存更快
 * 3.第二个参数把buffer 转成 utf-8 字符串，不转更快
 */
const buffer = fs.readFileSync(__dirname + "/source/index.html");

// 内存泄漏
// const arr = [];

app.use(
  mount("/", async (ctx) => {
    ctx.status = 200;
    ctx.type = "html";
    ctx.body = buffer;
    // arr.push(buffer);
  })
);

module.exports = app;
