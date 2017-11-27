const http = require('http');
const fs = require('fs');
let server = http.createServer((req, res) => {
    fs.mkdir('./aa');
    fs.rmdir('./aa');    
    res.end();
});
server.listen(8080, '127.0.0.1');