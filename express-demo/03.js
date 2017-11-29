const express = require('express');
var app = express();
app.use(function (req, res, next) {
    console.log('Time', Date.now());
    next();
})
app.use('/user/:id', function (req, res, next) {
    console.log('user'+ req.params.id);
    next();
})
app.get('/user/:id', function (req, res, next) {
    res.send('user-get'+ req.params.id);
    next();
})
app.listen(3000);