// 快速开发基于tcp连接的二进制网络协议接口的nodejs模块
// 和后台进行rpc
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

/**
 * 请求包编码
 * encode the data to binary（二进制）
 * @param {*} data 结构化数据  eg: {columnid: '233'}
 * @param {*} seq 包序号      eg: 1
 */
easySock.encode = function (data, seq) {
  // 结构化数据  ==>  buffer
  const body = schemas.ColumnRequest.encode(data);
  //   console.log("body", body);

  // creates a zero-filled Buffer of length 8.
  const head = Buffer.alloc(8);
  // 将seq写入buf，seq必须是有效的符号的32位整数
  head.writeInt32BE(seq);
  // 将body写入buf
  head.writeInt32BE(body.length, 4);
  //   console.log("head", head);

  //   console.log("head&body", Buffer.concat([head, body]));
  // 连接head，body的buffer
  return Buffer.concat([head, body]);
};
// decode the buffer
easySock.decode = function (buffer) {
  console.log("buffer", buffer);
  // 读取包序号
  const seq = buffer.readInt32BE();
  // 截取掉请求头
  const body = schemas.ColumnResponse.decode(buffer.slice(8));

  //   console.log("seq", seq);
  //   console.log("body", body);
  return {
    //   结构化数据
    result: body,
    // 包的序号
    seq,
  };
};
// check if the package is received complete
easySock.isReceiveComplete = function (buffer) {
  // 连包头都凑不齐
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
