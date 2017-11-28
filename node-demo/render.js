const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
let server = http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;
    if (pathname === '/') {
        pathname = 'index.html';
    }
    let extname = path.extname(pathname);
    fs.readFile('./static/' + pathname, (err, data) => {
        if (err) {
            fs.readFile('./static/404.html', (err, data) => {
                res.writeHead(404, {"Content-Type":"text/html;charset=utf8"});
                res.end(data);
            });
            return;
        }
        let mime = getMime(extname);
        res.writeHead(200, {'Content-Type': mime});
        res.end(data);
    });
});
server.listen(8080, '127.0.0.1');
function getMime (extname) {
    fs.readFile('./mime.json', (err, data) => {
        if (err) {
            throw err;
            return;
        }
        //转换成json
    let mimeJson = JSON.parse(data);
    return mimeJson;
    })
    switch(extname) {
        case '.html':
            return "text/html";
            break;
        case '.jpg':
            return "image/jpg";
            break;
        case '.jpeg':
            return "image/jpeg";
            break;
    }
}