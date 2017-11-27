const http = require('http');
let server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-type": "text/html;charest=UTF-8",
    });
    res.end("<h1>我是一个主标题</h1>")
}).listen(8080, '127.0.0.1');