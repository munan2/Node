const http = require('http');
const url = require('url');
let data = {
    'name': 'munan',
    'age': '24'
};
http.createServer((req, res) => {
    let params = url.parse(req.url, true);
    if (params.query) {
        if (params.query.username === 'munan') {
            let result = params.query.callback + '('+ JSON.stringify(data) + ')';
            res.end(result);
        } else {
            res.end(JSON.stringify(data));
        }
    }
}).listen(8081);