const http = require('http');
const querystring = require('querystring');
var server = http.createServer((req, res) => {
    if (req.url === '/postRequest' && req.method.toLowerCase() === 'post') {
        let postData = '';
        req.addListener('data', (chunk) => {
            postData += chunk;
            console.log(chunk);
        })
        req.addListener('end', () => {
            console.log(postData.toString());
            res.end('success');
        })
    }
})
server.listen(3000, '127.0.0.1')