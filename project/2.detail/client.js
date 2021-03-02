// 快速开发基于tcp连接的二进制网络协议接口的nodejs模块
const EasySock = require("easy_sock");

// .proto文件的编解码，二进制转化辅助模块，用于rpc二进制传输
const protobuf = require("protocol-buffers");
const fs = require("fs");
const schemas = protobuf(fs.readFileSync(`${__dirname}/detail.proto`));

const easySock = new EasySock({
  ip: "127.0.0.1",
  port: 4000,
  timeout: 500,
  // tcp 是否全双工
  keepAlive: true,
});

easySock.encode = function (data, seq) {
  const body = schemas.ColumnRequest.encode(data);

  const head = Buffer.alloc(8);
  head.writeInt32BE(seq);
  head.writeInt32BE(body.length, 4);

  return Buffer.concat([head, body]);
};
easySock.decode = function (buffer) {
  const seq = buffer.readInt32BE();
  const body = schemas.ColumnResponse.decode(buffer.slice(8));

  return {
    result: body,
    seq,
  };
};
easySock.isReceiveComplete = function (buffer) {
  if (buffer.length < 8) {
    return 0;
  }
  const bodyLength = buffer.readInt32BE(4);

  if (buffer.length >= bodyLength + 8) {
    return bodyLength + 8;
  } else {
    return 0;
  }
};

module.exports = easySock;
