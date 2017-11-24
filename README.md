# Node
## MAC安装
1. 安装xcode

	```
	xcode-select -p
	xcode-select --install
	```
2. homebrew 安装
3. brew install node

## node学习笔记
### module.exports
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
**module.export=aa,这里aa是一个函数，也是一个对，象它相当于导出了整个aa对象，外面的模块调用它的时候，能够调用aa的所有方法，这里注意的是只有aa的静态方法才能被调用，prototype创建的方法是aa的私有方法**

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
### HTTP-get/request


