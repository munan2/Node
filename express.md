# express笔记
## 安装
```ruby
mkdir express-demo
cd express-demo
npm init//一路回车，如果看到entry point: (index.js)，表示入口文件，键入 app.js 或者你所希望的名称，这是当前应用的入口文件。如果你希望采用默认的 index.js 文件名，只需按“回车”键即可。
npm install express --save

```
## API
### express()
express()是一个由express模块导出的入口函数
```ruby
var express = require('express');
var app = express();
```
### 路由
路由有一个URI、HTTP请求和若干句柄组成，结构如下
```ruby
app.METHOD(path, callback)
```
app是express对象的一个实例，METHOD是HTTP请求方法，path是服务器上的路径，callback是当路由匹配时执行的函数。
#### 路由方法
##### GET和POST方法
```ruby
    app.get('/', function (res, res) {
        res.send('GET')
    })
    app.post('/', function (req, res) {
        res.send('POST')
    })
```
Express 定义了如下和 HTTP 请求对应的路由方法： get, post, put, head, delete, options, trace, copy, lock, mkcol, move, purge, propfind, proppatch, unlock, report, mkactivity,  checkout, merge, m-search, notify, subscribe, unsubscribe, patch, search, 和 connect。
##### app.all()
一个特殊的路由方法，只要满足请求路径的要求，不管是什么http请求方式，callback都会执行。
```ruby
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});
```
#### 响应的方法
1. res.download()提示下载文件
2. res.end()响应结束时执行
3. res.json()发送一个JSON格式的响应
    ```
    res.json({ user: 'tobi' })
    ```
4. res.jsonp()发送支持jsonp的json格式的响应
5. res.redirect()重定向请求
6. res.render() 渲染视图模板
7. res.send()发送各种类型的响应
8. res.sendStatus()设置响应状态码

### 托管静态文件
Express内置的express.static可以方便地托管静态文件，例如图片，css,js文件等。将静态资源文件所在的目录作为参数传递给express.static中间件就可以提供静态资源文件的访问
```ruby
app.use(express.static('./public'));
```

### 中间件
什么是中间件？
中间件是一个函数，可以访问请求对象，响应对象，和web应用中处于请求-循环流程中的中间件，一般命名为next变量
中间件的功能
- 执行代码
- 修改请求和响应对象
- 终结请求-响应循环
- 调用堆栈中的下一个中间件

如果中间件没有终结请求-响应循环，就必须用next()方法将控制权交给下一个中间件，否则请求会挂起。  
```
request               app
   |                          yes
   +------------------>match?----->middleware1
                         | no          |
                         v             |
                        next<----------+
                         |
                         v    yes
                      match?------>middleware2
                         | no          |
                         v             |
                        next<----------+
                         |
                         v    yes
                      match?------>middleware3
                         | no          |
                         v             |
                        out<-----------+
                         |
   +---------------------+
   |
   v
  end(response在处理过程中已经返回了)
```
#### 应用级中间件
绑定在app对象上，使用app.use()或者app.method()
```ruby
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
```