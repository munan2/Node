//require引包
const http = require('http');
//创建服务器，参数是一个回调函数，表示有请求进来，要做什么
let server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-type": "text/html;charest=UTF-8"});
    res.end('哈哈哈');
}).listen(8080);