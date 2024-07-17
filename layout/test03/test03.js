// SSE流式输出：需要npm i express
const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const text = `服务端向客户端推送消息，除了用WebSocket可实现，还有一种服务器发送事件(Server-Sent Events)简称 SSE，这是一种服务器端到客户端(浏览器)的单向消息推送。ChatGPT 就是采用的 SSE。对于需要长时间等待响应的对话场景，ChatGPT 采用了一种巧妙的策略：它会将已经计算出的数据“推送”给用户，并利用 SSE 技术在计算过程中持续返回数据。但是我在用sse测试的时候，在每次内容输出结束之后，都会走onerror报错，这不是代码本身的问题，这是机器上使用的防病毒安全的一个问题。`;
// https://community.sophos.com/on-premise-endpoint/f/sophos-endpoint-software/74878/server-sent-events-blocked-by-download-scanner
app.get('/stream', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  let index = 0;
  const interval = setInterval(() => {
    if (index >= text.length) {
      clearInterval(interval);
      res.end();
      return
    }
    const char = text[index];
    res.write(`data: ${char}\n\n`);
    index++;
  }, 100);

  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});

app.get('/', (req, res) => {
  res.send('Hello, this is the homepage');
});

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});


// HTTP 流式输出
// const http = require("http")

// const text = `HTTP 流式输出是一种服务器向客户端发送数据的方式，允许数据以连续的“流”的形式发送，而不是一次性发送整个数据集。这种技术特别适用于处理大量数据或实时数据传输的场景，例如视频直播、实时数据更新等。\r\n以下是实现 HTTP 流式输出的一些关键点：`;

// const sendData = (res, text) => {
//   const intervalId = setInterval(() => {
//     if (text.length === 0) {
//       clearInterval(intervalId);
//       res.end();
//       return;
//     }
//     const char = text[0]
//     res.write(char)
//     text = text.substring(1)
//   }, 100)
// }

// http.createServer(async (req, res) => {
//   res.writeHead(200, {
//     "Transfer-Encoding": "chunked",
//     "Access-Control-Allow-Origin": "*",
//     "Content-Type": "text/event-stream"
//   })
//   sendData(res, text)
// }).listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// })