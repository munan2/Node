const express = require('express');
let app = express();
app.get('/', (req, res) => {
    res.send('HELLO');
})
app.get('/haha', (req, res) => {
    res.send('这是哈哈页面，哈哈哈')
})
app.listen(3000);