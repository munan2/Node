const http = require('http');
const query = require('querystring');
const fs = require('fs');
let file = './post.json';
let result = JSON.parse(fs.readFileSync(file));
http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    let postData = '';
    req.addListener('data', (chunk) => {
        postData += chunk;
    });
    req.addListener('end', () => {
        let params = query.parse(postData);
        if (params.username === 'munan') {
            res.end(result);
        }
    });
}).listen(8082);