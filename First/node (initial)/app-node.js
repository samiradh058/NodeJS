const http = require("http");

const routes = require("./routes-node");

// const server = http.createServer((req, res) => {
// console.log(req.url, req.method, req.headers);
//   process.exit();
// });

const server = http.createServer(routes);

server.listen(3000);
