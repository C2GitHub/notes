# notes
# 1. localStorage、sessionStorage、Cookie的区别及用法

>### localStorage、sessionStorage、Cookie共同点：都是保存数据在浏览器端，且同源的。

### webstorage
> webstorage是本地存储，存储在客户端，包括localStorage和sessionStorage。

### localStorage
> localStorage生命周期是永久，这意味着除非用户显示在浏览器提供的UI上清除localStorage信息，否则这些信息将永远存在。存放数据大小为一般为5MB,而且它仅在客户端（即浏览器）中保存，不参与和服务器的通信。

### sessionStorage
> sessionStorage仅在当前会话下有效，关闭页面或浏览器后被清除。存放数据大小为一般为5MB,而且它仅在客户端（即浏览器）中保存，不参与和服务器的通信。

#### 作用域不同
> 不同浏览器无法共享localStorage或sessionStorage中的信息。相同浏览器的同源页面间可以共享相同的 localStorage，但无法共享sessionStorage的信息。

### Cookie
> cookie一般用于储存与用户相关的一些数据信息，每次HTTP请求都会携带cookie数据到服务器端。且每条cookie都具有自己的生命期，为只在设置的cookie过期时间之前有效。存放数据大小为4K左右 。有个数限制（各浏览器不同），一般不能超过20个。
####使用cookie主要要考虑其两大特性：
1. 因为每次HTTP请求都携带会cookie到服务器端，如果使用cookie保存过多数据势必会增大带宽，带来性能问题。
2. 安全性，因为cookie存储在浏览器端，所以就存在被拦截的可能。所以不能cookie来保存用户一些太私密的信息。可以用服务器端session来保存。

## 2. get和post的初高级区别
> 1.get长度有限，而post长度可以更长
> 2.get的请求包含参数将会被cache 但是post 不会
> 3.get的url能被存为标签但是post不能

> 4.get只能进行url编码，post则可以多种编码
> 5.get只接受ASCII字符 但是post没有限制

> 6.get后退无害，但是post会出发再次请求

> 7.get比post的安全性差，因为get参数直接暴露在url中

## 3. ajax 封装
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

## 4. JSONP 原理及封装
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

> 如果是这么写success:function(data){conosle.log(data);}
会报一个success is undefined错误，success必须先定义

## 5. 前端框架技术选型

> 1. Vue更加轻量、gzip后大小只有20k+
> 2.  Vue.js更容易上手、学习曲线平稳 
> 3. 吸取了angular 和 react两家之长、入angular指令和react模块化开发

##  6. JS中使用typeof 能得到的那些类型的值?

> 1.number  2.string   3.boolean  4.undinfed   5. object   6.Function  7.Symbol

##  7.何时使用 === 何时使用 ==？

> 1. == 判断两变量数值是否相等、会对数值进行隐式数据转换。
>
> 2. === 不仅判断两变量数值是否相等、并且也要等数据类型进行判断。
>
>    === 的判断条件比==更加严格。一般如果判断变量属性为null 或undefined是用==，其他全部用===。

## 8. JS 中有哪些内置函数 --数据封装类对象

> 1. Object
> 2. Array
> 3. String
> 4. Number
> 5. Boolean
> 6. Function
> 7. Date
> 8. Regexp
> 9. Error
> 10. Math(内置对象)
> 11. JSON(内置对象)

## 9. 如何准确判断一个变量是数组类型

```

```

```JavaScript
var arr= []
arr instanceof Array // true
typeof arr // Object 无法准确判断
```

```

```

## 10. 描述new一个对象的过程

> 1. 创建一个新对象
> 2. this指向这个新对象
> 3. 执行代码、既对this赋值
> 4. 返回this

## 11. 源码分析

> 慕课网课程“zepto设计和源码分析” 、jQuery源码解读

## 12. 原型链继承

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

##  13.闭包的使用场景

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

## 14. this的使用场景

> this 指向的是拥有当前执行环境的对象

* 作为构造函数执行  this指向实例对象
* 作为对象属性执行  this指向当前对象
* 作为普通函数执行  this指向window
* call  apply  bind 

## 15. 作用域链的理解

> 当代码在一个环境中执行时、会创建一个变量对象的作用域链。作用域链的用途，是保证了执行环境中有权访问的所有变量和函数的有序访问。作用域链的最前端，始终是当前执行的代码所在环境的变量对象。而作用域链的变量搜索机制是，如果当前活动对象中有目标变量、则直接调用。如果没有，则会向所包含它是外部环境进行一级一级向后查找，一直延续到全局执行环境。如果直到全局还未找到，则会报ReferenceError错误。

## 16. 对异步和同步的理解

> 同步会阻塞后面代码的执行、而异步不会

> 前端使用异步的场景

* 1. 定时任务： setTimeout setInterval
  2. 网络请求： ajax请求，动态资源加载
  3. 事件绑定