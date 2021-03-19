const { graphql, buildSchema } = require("graphql");
const app = new (require("koa"))();
const mount = require("koa-mount");
const static = require("koa-static");
const graphqlHTTP = require("koa-graphql");

// 定义类型
const schema = buildSchema(`
    type Query {
        name: String
        age: String
    }
`);
// 定义数据
const root = {
  name: () => "rocky",
  age: () => "18",
};

// 直接用 grapql
// function grapql(query) {
//   return graphql(schema, query, root).then((res) => res);
// }

// app.use(async (ctx) => {
//   const res = await grapql(`{ ${Object.keys(ctx.query)[0]} }`);

//   ctx.body = res;
// });

// 社区中间件 koa-graphql
app.use(
  graphqlHTTP({
    schema: require("./schema"),
  })
);

app.listen(3002);
