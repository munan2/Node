const http = require('http');
const fs = require('fs');

let server = http.createServer((req, res) => {
    if (req.url === '/fang') {
        fs.readFile('./test.html', (err, data) => {
            res.writeHead(200, {"Content-type": "text/html;"});
            res.end(data);
        }); 
    } else if (req.url === '/yuan'){
        fs.readFile('./test02.html', (err, data) => {
            res.writeHead(200, {"Content-type": "text/html"});
            res.end(data);
        });
    }
    
}).listen(8080, '127.0.0.1');