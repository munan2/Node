[学习node链接1](https://juejin.im/post/58cf4a3144d90400690b7be7)
# Node
## MAC安装
1. 安装xcode

	```
	xcode-select -p
	xcode-select --install
	```
2. homebrew 安装
3. brew install node

## 特点
- 单线程，减少了内存的开销
- 非阻塞I/O
- 事件驱动

通俗来理解node的特点：  
Node是单线程的，这样是可以减少内存的开销，如果有一个事件A进入，处理了一个但是被I/O阻塞了，这是这个线程就被阻塞了，但是node是非阻塞I/O，所以它不会被I/O阻塞，它会让I/O自己处理的时候，不等待A事件，先处理事件B,等事件A的I/O回调完成，根据node的事件驱动机制（事件环）。将事件A放入事件环里，等待调度。
### 适合开发什么业务
善于I/O，不善于计算。NodeJS最擅长的就是任务调度，如果业务调度的CPU进行计算，实际上相当于计算阻塞了这个单线程。    
__当应用程序需要处理大量并发的I/O，而在向客户端发出响应之前，应用程序不需要进行非常复杂的处理时，nodejs就非常合适。nodejs非常适合与websocket配合，开发长连接的实时交互应用程序。__  
比如：

- 聊天室
- 考试系统
- 表单提交（多人提交并发提交）
- 图文直播

## node学习笔记
### module.exports
**暴露函数，变量可以使用exports，暴露一个类，使用module.exports** 
每一个node.js执行文件时，都会自动创建一个module对象，同时module对象会创建一个叫exports的属性，初始化的值为{}

```
module.exports = {};
```
看这个例子：foo.js

```
exports.a = () => {
    console.log('a');
}
module.exports = {a:2};
exports.a = 1;
```

test.js

```
var x = require('./foo');
console.log(x.a);
```

命令行里node test.js 输出的结果是：2   
**module.export=aa,这里aa是一个函数，也是一个对象它相当于导出了整个aa对象，外面的模块调用它的时候，能够调用aa的所有方法，这里注意的是只有aa的静态方法才能被调用，prototype创建的方法是aa的私有方法**

```
//Fn.js
function Fn () {
    this.name = 'zhangyan';
}
Fn.eat = () => {
    console.log('she like eating');
}
Fn.prototype.drink = () => {
    console.log('she like drinking cola');
}
module.exports = Fn;
```
```
test.js
var y = require('./Fn');
console.log(y);
console.log(y.eat);
console.log(y.drink);
```
输出的结果是：

```
{ [Function: Fn] eat: [Function] }
[Function]
undefined
```
### HTTP
http模块提供两种使用方式：

- 作为服务器端使用，创建一个http服务器，监听http客户端请求并响应
- 作为客户端使用，发起一个http客户端请求，获取服务器端响应。

#### http.createServer()
返回的是Server对象，参数是请求事件被触发执行时的回调函数，参数列表和request事件相同，第一个参数是客户端请求的IncomingMessage对象，第二个对象是用来制定和发送响应的ServerResponse对象。创建server对象，可以通过Server对象上的listen()方法开始监听。listen(port,[hostname],[backlog],[callback])

```
http.createServer((req, res) => {
}).listen(port);
```
#### response.end()
通知服务器，所有响应头和响应主体都已经发送，服务器视为已完成。三个参数,end里的内容必须是字符串。
在createServer回调函数里，必须写上response.end()，如果不写，服务器会视为还未完成，这样浏览器会一直在转圈。
#### response.writeHead(status, statusMessage, {})
发送一个响应头给请求，第一个参数是状态码，第二个参数是statusMessage是可选的，最后一个参数是一个对象，响应头。

```
response.writeHead(200, {
  'Content-Length': Buffer.byteLength(body),
  'Content-Type': 'text/plain' });
```
这个方法在消息中只能被调用1次，且必须在response.end()之前被调用
#### req.url用户请求的url地址
提到url会涉及到两个模块

- URL模块
- querystring模块

### URL
URL的组成格式：

- 协议protocol，常见http,https
- 主机地址host，可以是域名或者ip地址
- port 端口号
- path路径，网络资源在服务器的指定路径
- parameter参数，如果要向服务器传参数就在这部分输入
- query查询字符串
- hash锚点，访问网页后直接到达指定位置

Node里URL的方法：

- url.parse()
- url.format() format和parse相反
- url.resolve() 想域名和参数拼接在一起生成一个新的url

```
url.parse('https://www.baidu.com:3000/question/search?a=1&b=2#33')
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com:3000',
  port: '3000',
  hostname: 'www.baidu.com',
  hash: '#33',
  search: '?a=1&b=2',
  query: 'a=1&b=2',
  pathname: '/question/search',
  path: '/question/search?a=1&b=2',
  href: 'https://www.baidu.com:3000/question/search?a=1&b=2#33' }
```
### querystring 查询字符串
- querystring.parse()

	```
	querystring.parse('a=123&b=234&c=456')
	{ a: '123', b: '234', c: '456' }
	```
- querystring.stringfy()与parse相反

### 原生node路由的设计
可以通过判断req.url来实现

```
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
```

### fs
#### readFile
三个参数 

- path 文件路径，记住要加上./表示当前目录下
- options 对象或者字符串
	- encoding 编码方式
	- flag 默认为'r'一般不会用到
- callback 函数，这个函数有两个参数err,data

	```
	fs.readFile('./test.txt', {"charest": "utf-8"}, (err, data) => {
	    if (err) {
	        throw err;
	    }
	    console.log(1);
	    res.end(data);
	});
	console.log(2);
	```
	
#### mkdir
创建文件夹

	```
	let server = http.createServer((req, res) => {
	    fs.mkdir('./aa');
	    res.end();
	});
	```
	
#### rmdir
删除文件夹
### path
#### path.extname(path)
返回path的拓展名，从path的最后一个.字符到字符串结束。

	```
	path.extname('index.html');
	// 返回: '.html'
	
	path.extname('index.coffee.md');
	// 返回: '.md'
	
	path.extname('index.');
	// 返回: '.'
	
	path.extname('index');
	// 返回: ''
	
	path.extname('.index');
	// 返回: ''
	```
	
## readFile读取json文件
```
fs.readFile('./mime.json', (err, data) => {
        if (err) {
            throw Error('找不到mime.json文件');
            return;
        }
        let data2 = JSON.parse(data);
    })
```
注意这里需要对data做一下处理，JSON.parse(data)，否则是buffer类型的数据，而不是json格式的

## POST请求
Node.js将POST请求的数据拆分成为了众多的数据块(chunk)，然后通过特定的事件，将这些小数据块有序传递给回调函数。

```
const http = require('http');
const querystring = require('querystring');
var server = http.createServer((req, res) => {
    if (req.url === '/postRequest' && req.method.toLowerCase() === 'post') {
        let postData = '';
        //node为了追求极致，都是一小段的接收，接收一小段可能会去给别人服务了，防止一个过大的表单阻塞了整个进程
        req.addListener('data', (chunk) => {
            postData += chunk;
            console.log(chunk);
        })
        //全部传输完毕
        req.addListener('end', () => {
            console.log(postData.toString());
            res.end('success');
        })
    }
})
server.listen(3000, '127.0.0.1')
```
原生的POST，要写两个监听
