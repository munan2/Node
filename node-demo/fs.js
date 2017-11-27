const http = require('http');
const fs = require('fs');
let server = http.createServer((req, res) => {
    var userId = parseInt(Math.random() * 8999) + 10000;
    console.log('欢迎' + userId);
    res.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
    //第一个参数是完整路径，当前目录./
    //第二个参数是回调函数，表示文件读取成功后做的事情
    fs.readFile('./test.txt', {"charest": "utf-8"}, (err, data) => {
        if (err) {
            throw err;
        }
        console.log(userId + '文件完毕');
        res.end(data);
    });
});
server.listen(8080, '127.0.0.1');