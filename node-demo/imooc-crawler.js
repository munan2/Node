var http = require('http');
var url = 'http://www.imooc.com/video/7965';
http.get(url, (res) => {
    var html = '';
    res.on('data', (data) => {
        html += data
    });
    res.on('end', () => {
        console.log(html);
    });
}).on('error', () => {
    console.log('获取课程信息出错')
});