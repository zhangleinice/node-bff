const { graphql, buildSchema } = require("graphql");

// 定义类型
const schema = buildSchema(`
    type Query {
        name: String
    }
`);

// 定义数据
const root = { name: () => "rocky!" };

// 查询
graphql(schema, "{ name }", root).then((res) => {
  console.log("res", res);
});
