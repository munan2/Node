const http = require('http');
const url = require('url');

let server = http.createServer((req, res) => {
    let queryObj = url.parse(req.url, true).query;
    let name = queryObj.name;
    let age = queryObj.age;
    let sex = queryObj.sex;
    res.end("服务器收到了表单请求" + name + age + sex);
});
server.listen(8080, '127.0.0.1');