# notes
## localStorage、sessionStorage、Cookie的区别及用法

**localStorage、sessionStorage、Cookie共同点：都是保存数据在浏览器端，且同源的。**

1. webstorage

webstorage是本地存储，存储在客户端，包括localStorage和sessionStorage。

2.  localStorage

localStorage生命周期是永久，这意味着除非用户显示在浏览器提供的UI上清除localStorage信息，否则这些信息将永远存在。存放数据大小为一般为5MB,而且它仅在客户端（即浏览器）中保存，不参与和服务器的通信。

3. sessionStorage

sessionStorage仅在当前会话下有效，关闭页面或浏览器后被清除。存放数据大小为一般为5MB,而且它仅在客户端（即浏览器）中保存，不参与和服务器的通信。

#### 作用域不同
​	不同浏览器无法共享localStorage或sessionStorage中的信息。相同浏览器的同源页面间可以共享相同的 localStorage，但无法共享sessionStorage的信息。

### Cookie
cookie一般用于储存与用户相关的一些数据信息，每次HTTP请求都会携带cookie数据到服务器端。且每条cookie都具有自己的生命期，为只在设置的cookie过期时间之前有效。存放数据大小为4K左右 。有个数限制（各浏览器不同），一般不能超过20个。

* 使用cookie主要要考虑其两大特性：

1. 因为每次HTTP请求都携带会cookie到服务器端，如果使用cookie保存过多数据势必会增大带宽，带来性能问题。
2. 安全性，因为cookie存储在浏览器端，所以就存在被拦截的可能。所以不能cookie来保存用户一些太私密的信息。可以用服务器端session来保存。

##  get和post的区别

1. get长度有限，而post长度可以更长
2. get的请求包含参数将会被cache 但是post 不会
3. get的url能被存为标签但是post不能

4. get只能进行url编码，post则可以多种编码
5. get只接受ASCII字符 但是post没有限制

6. get后退无害，但是post会出发再次请求

7. get比post的安全性差，因为get参数直接暴露在url中

## ajax 封装
```javascript
function ajax(option){
//用户配置option 默认配置init
var init = {
type:'get',
async:true,
url:'',
success: function () { },
error: function () { },
data:{},
beforeSend: function () {
console.log('发送前...');
return false;
}
};
//TODO step1: 合并参数
for(k in option){
init[k] = option[k];
}
//TODO step2: 参数转换
var params = '';
for(k in init.data){
params += '&'+k+'='+init.data[k];
}
var xhr = new XMLHttpRequest();
// type url
//TODO step3: 区分get和post,进行传参
var url = init.url+'?__='+new Date().getTime();
//TODO step4: 发送前
var flag = init.beforeSend();
if(!flag){
return;
}
if(init.type.toLowerCase() == 'get'){
url += params;
xhr.open(init.type,url,init.async);
xhr.send();
}else{
xhr.open(init.type,url,init.async);
xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
xhr.send(params.substr(1));
}
xhr.onreadystatechange = function () {
if(xhr.readyState == 4){
if(xhr.status>=200 && xhr.status<=207 || xhr.status==304){
init.success(xhr.responseText);
}else{
//error
init.error();
}
}
}
}
```

##  JSONP 原理及封装
```
function success(data){
console.log(data);
}
jsonp({
url:'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
type:'get',
data:{
wd:'jsonp'
},
callback :'cb',
success:success
});
function jsonp(options){
var url = options.url;
var data = options.data;

format(data,options,function(str,callback){
var oBody = document.getElementsByTagName('body')[0];
var oScript = document.createElement('script');
oScript.setAttribute('src',url+'?'+str + options.callback+'='+callback);
oBody.appendChild(oScript);
});
return options.success;

};
function format(data,options,callback){
var callbackName = '';
var str = '';
for(var p in data){//格式化get提交的参数
str += p+'='+data[p]+'&';
}
for(var p in options){
if(options[p] == options.success){//取出要返回的函数名
callbackName = p;
callback && callback(str,callbackName);
}
}
}
```

如果是这么写success:function(data){conosle.log(data);}
会报一个success is undefined错误，success必须先定义

## 前端框架技术选型

1. Vue更加轻量、gzip后大小只有20k+

2. Vue.js更容易上手、学习曲线平稳 

3. 吸取了angular 和 react两家之长、入angular指令和react模块化开发

##   JS中使用typeof 能得到的那些类型的值?

1.number  2.string   3.boolean  4.undinfed   5. object   6.Function  7.Symbol

##  何时使用 === 何时使用 ==？

* == 判断两变量数值是否相等、会对数值进行隐式数据转换。

* === 不仅判断两变量数值是否相等、并且也要等数据类型进行判断。

* === 的判断条件比==更加严格。一般如果判断变量属性为null 或undefined是用==，其他全部用===。

##  JS 中有哪些内置函数 --数据封装类对象

* Object

* Array

* String

* Number

* Boolean

* Function

* Date

* Regexp

* Error

* Math(内置对象)

* JSON(内置对象)

## 如何准确判断一个变量是数组类型

```JavaScript
var arr= []
arr instanceof Array // true
Object.prototype.toString.call(arr) === '[object Array]';
typeof arr // Object 无法准确判断
```

## instanceof原理

使用：objA instanceof obj2

原理：objA的原型链中是否能找到obj2的原型

## 描述new一个对象的过程

* 在内存中申请一块空间，生成一新对象

* 将this指向这个新对象

* 对this赋值，建立原型链接 obj.__proto__ = Construtor.prototype

* 返回这个新对象

## 源码分析

慕课网课程“zepto设计和源码分析” 、jQuery源码解读

## 原型链继承

```javascript
// 原型链继承
function Ele() {

}

Ele.prototype.html = function (val) {
    if (val) {
        this.ele.innerHTML = val
        return this // 链式调用
    } else {
        return this.ele.innerHTML
    }
}

Ele.prototype.on = function (type, fn) {
    this.ele.addEventListener(type, fn)
    return this // 链式调用
}

function _$(id) {
    this.ele = document.getElementById(id)
}

_$.prototype = new Ele()
_$.prototype.constructor = _$

var div = new _$('lg')
div.html('text')
div.on('click', function () {
    console.log('click');
})
```

##  闭包的使用场景

> 1. 函数作为返回值
>
> ```javascript
> // 函数作为返回值
> function fn() {
>     var a = 100
>     return function () {
>         console.log(a);
>     }
> }
> 
> var f = fn()
> f()
> ```
>
> 2.  函数作为参数传递
>
>    ```javascript
>    // 函数作为参数传递
>    function fn(callback) {
>        var a = 100
>        callback()
>    }
>    
>    fn(function () {
>        console.log(a);
>    })
>    ```
>
>    
>
> 3. 闭包使用示例
>
>    ```javascript
>    // 1.闭包使用示例
>    function creatEle() {
>        var ul = document.createElement('ul')
>        for (var i = 0; i < 10; i++) {
>            var li = document.createElement('li')
>            ;(function (i) {
>                li.innerText = 'li content ' + i
>                li.addEventListener('click', function () {
>                    alert('click' + i)
>                })
>                ul.appendChild(li)
>            })(i)
>        }
>    
>        document.body.appendChild(ul)
>    }
>    creatEle()
>    
>    // 2.闭包使用示例
>    function isFirstLoad() {
>        var _list = []
>    
>        return function (id) {
>            if (_list.indexOf(id) >= 0 ) {
>                return false
>            } else {
>                _list.push(id)
>                return true
>            }
>        }
>    }
>    
>    var firstLoad = isFirstLoad()
>    console.log(firstLoad(10)) // true
>    console.log(firstLoad(10)) // false
>    console.log(firstLoad(20)) // true
>    console.log(firstLoad(20)) // false
>    ```

## this的使用场景

this 指向的是拥有当前执行环境的对象（当前正在执行的活动对象）

* 构造函数中的this：  this指向实例对象
* 对象属性中的this：  this指向当前对象
* 普通函数中的this：  this指向window
* 定时器中的this： this指向window
* 事件绑定中的this：this指向绑定事件的对象
* 箭头函数中的this：this执行函数定义时的作用域
* call  apply  bind 

## 作用域

变量和声明的作用范围。

* 函数作用域
* 块级作用域（es6）

## 作用域链的理解

* 作用域链：确定了变量的使用范围和变量的查找机制，保证了变量的有序访问
  * 使用范围
    * 变量如果在全局定义，则任何地方都能访问使用
    * 变量如果在局部作用域中定义，则该变量只能在该作用域以及该作用域包含的作用域中可以访问
  * 查找机制
    * 变量在使用的时候首先会在自己的当前作用域内查找，如果找到直接使用
    * 如果未找到则会一级一级向上查找，一直查找到全局（window）作用域。
    * 该过程只要找到该变量，就会直接使用并停止搜索，如果找到全局作用域还未找到，则会报引用错误

## 对异步和同步的理解

* 同步会阻塞后面代码的执行、而异步不会

* 前端使用异步的场景
  * 定时任务： setTimeout setInterval
  * 网络请求： ajax请求，动态资源加载
  * 事件绑定

## 节流与防抖

* 节流

  ```
  function throttle(fn ,wait) {
    let prev = Date.now();
    return function () {
      let context = this;
      let arg = arguments;
      let now = Date.now();
      if (now - prev > wait) {
        fn.apply(context, arg);
        prev = now;
      }
    }
  }
  
  function handle() {
    console.log(Math.random());
  }
  window.onscroll = throttle(handle, 1000)
  ```

* 防抖

  ```
  function debounce(fn, wait) {
    let timer = null;
    return function () {
      let context = this;
      let arg = arguments;
      if (timer) clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, arg);
      }, wait)
    }
  }
  ```

## 对象拷贝

* 浅拷贝： 以赋值形式的拷贝对象，拷贝的是对象的引用地址
  * Object.assign(target, source[, ...])
  * 展开运算符...

* 深拷贝：建立一个新对象并赋值，修改时源对象不受影响
  * JSON.parse(JSON.stringry( obj ))：性能最好
  * 递归判断类型，赋值