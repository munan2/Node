const http = require('http');
const fs = require('fs');
let server = http.createServer((req, res) => {
    getMine('html');
    res.end();
})
server.listen(3000, '127.0.0.1');
function getMine (extname) {
    fs.readFile('./mime.json', (err, data) => {
        if (err) {
            throw Error('找不到mime.json文件');
            return;
        }
        let mimeJson = JSON.parse(data);
        return mimeJson[extname];
    })
}