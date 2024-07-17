const http = require("http")

const text = `HTTP 流式输出是一种服务器向客户端发送数据的方式，允许数据以连续的“流”的形式发送，而不是一次性发送整个数据集。这种技术特别适用于处理大量数据或实时数据传输的场景，例如视频直播、实时数据更新等。\r\n以下是实现 HTTP 流式输出的一些关键点：`;

const sendData = (res, text) => {
  const intervalId = setInterval(() => {
    if (text.length === 0) {
      clearInterval(intervalId);
      res.end();
      return;
    }
    const char = text[0]
    res.write(char)
    text = text.substring(1)
  }, 100)
}

http.createServer(async (req, res) => {
  res.writeHead(200, {
    "Transfer-Encoding": "chunked",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "text/plain"
  })
  sendData(res, text)
}).listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
})


// 用express框架写

// const express = require('express');
// const app = express();

// const text = `HTTP 流式输出是一种服务器向客户端发送数据的方式，允许数据以连续的“流”的形式发送，而不是一次性发送整个数据集。这种技术特别适用于处理大量数据或实时数据传输的场景，例如视频直播、实时数据更新等。\r\n以下是实现 HTTP 流式输出的一些关键点：\r\n `;

// const sendData = (res, text) => {
//   const intervalId = setInterval(() => {
//     if (text.length === 0) {
//       clearInterval(intervalId);
//       res.end();
//       return;
//     }
//     const char = text[0];
//     res.write(char);
//     text = text.substring(1);
//   }, 100);
// };

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header("Transfer-Encoding", "chunked");
//   res.header('Content-Type', 'text/plain');
//   next();
// });

// app.get('/stream', (req, res) => {
//   sendData(res, text);
// });

// const server = app.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// });