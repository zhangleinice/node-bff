// client

const net = require("net");
const skt = new net.Socket({});
skt.connect({
  host: "127.0.0.1",
  port: 4000,
});

const LESSON_IDS = [
  "136797",
  "136798",
  "136799",
  "136800",
  "136801",
  "136803",
  "136804",
  "136806",
  "136807",
  "136808",
  "136809",
  "141994",
  "143517",
  "143557",
  "143564",
  "143644",
  "146470",
  "146569",
  "146582",
];

const index = Math.floor(Math.random() * LESSON_IDS.length);
const id = LESSON_IDS[index];

const buffer = Buffer.alloc(4);
buffer.writeInt32BE(id);

skt.write(buffer);

skt.on("data", (buffer) => {
  console.log("buffer", buffer);
  console.log("bufferToString", buffer.toString());
});
