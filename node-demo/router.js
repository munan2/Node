const http = require('http');
const url = require('url');
var server = http.createServer((req, res) => {
    //得到url
    let userUrl = req.url;
    if (userUrl.substr(0,9) === '/student/') {
        let studentId = userUrl.substr(9);
         if (/\d{10}/.test(studentId)) {
            res.end('stduentInfo');
         } else {
             res.end('error student number');
         }
    } else if (userUrl.substr(0,9) === '/teacher/') {
        let teacherId = userUrl.substr(9);
        if (/\d{6}/.test(teacherId)) {
           res.end('teacherInfo');
        } else {
            res.end('error teacher number');
        }
    } else {
        res.end('err url');
    }
});
server.listen(8080, '127.0.0.1');