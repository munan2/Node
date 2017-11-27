const http = require('http');
const url = require('url');
let server = http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;
    let query = url.parse(req.url).query;
    console.log(pathname + '-' + query);
    res.end();
});
server.listen(8080, '127.0.0.1');