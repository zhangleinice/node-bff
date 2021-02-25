/**
 *  EventEmitter
 */

// const EventEmitter = require("events").EventEmitter;

// class Geektime extends EventEmitter {
//   constructor() {
//     super();
//     setInterval(() => {
//       this.emit("test", Math.random() * 100);
//     }, 3000);
//   }
// }

// const geektime = new Geektime();
// geektime.addListener("test", (res) => {
//   console.log(res);
// });

/**
 * callback
 * error-first
 */

// function interview(cb) {
//   setTimeout(() => {
//     if (Math.random() > 0.5) {
//       cb(null, "success");
//     } else {
//       cb(new Error("error"), "fail");
//     }
//   }, 3000);
// }

// interview(function (err, res) {
//   if (err) {
//     return console.log("cry");
//   }
//   return console.log("smile");
// });

/**
 * event loop
 */

// const eventLoop = {
//   queue: [],
//   //   timeoutqueue: [],
//   //   fsqueue: [],
//   loop() {
//     while (this.queue.length) {
//       const cb = this.queue.shift();
//       cb();
//     }
//     // while (this.timeoutqueue.length) {
//     //   const cb = this.queue.shift();
//     //   cb();
//     // }
//     // while (this.fsqueue.length) {
//     //   const cb = this.queue.shift();
//     //   cb();
//     // }
//     console.log("finish");
//     setTimeout(this.loop.bind(this), 50);
//   },
//   add(callback) {
//     this.queue.push(callback);
//   },
// };

// eventLoop.loop();

// setTimeout(() => {
//   eventLoop.add(function () {
//     console.log(1);
//   });
// }, 500);

// setTimeout(() => {
//   eventLoop.add(function () {
//     console.log(2);
//   });
// }, 2000);

/**
 * http
 */

// const http = require("http");
// const fs = require("fs");
// http
//   .createServer((req, res) => {
//     res.writeHead(200);
//     fs.createReadStream(__dirname + "/index.html").pipe(res);
//   })
//   .listen(4000);

/**
 *  rpc
 */

// 创建buffer，默认utf8
// const buf1 = Buffer.from("geekbang");
// const buf2 = Buffer.from([1, 2, 3, 4]);
// console.log("buf1", buf1);
// console.log("buf1ToString", buf1.toString());
// console.log("buf2", buf2);
// console.log("buf2ToString", buf2.toString());

// const protobuf = require("protocol-buffers");
// const fs = require("fs");

// const schema = protobuf(fs.readFileSync(__dirname + "/test.proto", "utf-8"));

// const buf = schema.Test.encode({
//   id: 1,
//   name: "test",
//   price: 20.4,
// });

// console.log("buf", buf);
// console.log(schema.Test.decode(buf));

/**
 * net
 */

//  单工通讯
