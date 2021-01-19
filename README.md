# NOTE

## CSS

### css盒模型

1. 基本概念

   * content、border、padding、margin

   * 标准盒模型
   * IE盒模型（怪异盒模型）

2. 标准盒模型和IE盒模型的区别

   两种盒模型的区别在于宽度和高度的计算方式不同：

   * 标准盒模型：宽高就指的是content的宽高，不包含border和padding

   * IE盒模型：宽高则是由包含content，border，padding三部分组成

3. CSS如何设置这两种模型

   ```
   box-sizing: content-box; 标准盒模型
   box-sizing: border-box; IE盒模型
   ```

4. JS如何设置获取盒模型对应的宽和高

   * 方式1
     * 通过dom.style.width/height获取
     * 只能获取内联样式的元素
     
   * 方式2
     
     * dom.currentStyle.width/height 只有IE支持
     
   * 方式3*
   
     * window.getComputedStyle(dom).width/height
     
   * 方式4*
     
     * dom.getBoundingClientRect() 得到一个元素在视口中的位置：left，top，width、height
     
     ```
     {
       	width: 542
       	height: 698
       	bottom: 886
     	left: 224
     	right: 766
     	top: 188
     	x: 224
     	y: 188
     }
     ```
   
   

### 外边距重叠

* 相邻两元素同时设置的margin值，则最终margin会以最大的为准

### BFC

* BFC的概念
  
* 块级格式化上下文
=======
* BFC的概念： 块级格式化上下文，表示一个独立的布局区域。
* BFC的特性
  
     1. BFC的元素，不会影响外面的布局；外面的布局也不会影响BFC内部布局
     2. BFC的元素，会在垂直方向叠加margin
     3. BFC的区域不会与float的元素区域重叠
  4. BFC元素计算高度，浮动元素也会参与计算
  
* BFC的创建
  
     1. float不为none
     2. position的值不为static或relative
     3. overflow不为visible
  4. display值为inline-block、table-cell、table-caption
  
* BFC的应用
  
     1. 清除浮动（BFC在计算高度的时候，浮动元素也会参与计算）
     2. 避免外边距重叠： 给BFC元素设置一个父级元素
     3. 自适应两栏布局（BFC元素区域不会与浮动元素重叠）

### 选择器优先级

*  ！important > 行内样式 > id选择器 > class选择器 > tag选择器 > *通配符 > 继承 > 默认

### Flex布局

* flex : 默认0 1 auto，flex属性是flex-grow，flex-shrink与flex-basis三个属性的简写，用于定义项目放大，缩小与宽度。
  * flex-grow : 默认0，用于决定项目在有剩余空间的情况下是否放大，默认不放大
  * flex-shrink : 默认1，用于决定项目在空间不足时是否缩小，默认不缩小
  * flex-basis ： 默认auto，用于设置项目宽度

* flex-flow : flex-deriction与flex-wrap属性的简写，默认为row nowrap
  * flex-direction : row(默认) | row-reverse | column | column-reverse
  * flex-wrap : nowrap(默认) | wrap | wrap-reverse
* justify-content： flex-start(默认) | flex-end | center | space-between | space-around | space-evenly 横轴的对齐方式
* align-items ：flex-start | flex-end | center | baseline | stretch(默认)  纵轴排列方式

* flex特殊取值解析
  * flex: none    0 0 auto
  * flex: auto     1 1 auto
  * flex: 1            1  1 0%



## HTML

### DOM事件

1. 基本概念：dom事件的级别

2. DOM事件模型
  
   * 捕获和冒泡
   
3. DOM事件流
   * 捕获阶段
   * 目标阶段
   * 冒泡阶段
   
4. DOM事件捕获的具体流程

   window -> document -> html(documentElement) -> body -> ... -> target -> ... window

5. Event对象的应用

   * 阻止默认行为 ev.preventDefault()
   * 阻止冒泡 ev.stopPropagation()
   * 获取事件源（事件代理） ev.target

6. 自定义事件

   ```
   // 1. 事件的创建 EVent / CustomEvent(可以设置第二个参数对象)
   var myEv = new Event("ev1")
   // 2. 事件监听
   ele.addEventListener("ev1", function() {
   	console.log("ev1")
   })
   
   // 3. 事件的触发
   ele.dispathEvent(myEv)
   ```


## JS

### JS中使用typeof 能得到的那些类型的值?

1.number  2.string   3.boolean  4.undinfed   5. object   6.Function  7.Symbol

### 何时使用 === 何时使用 ==？

- == 判断两变量数值是否相等、会对数值进行隐式数据转换。
- === 不仅判断两变量数值是否相等、并且也要等数据类型进行判断。
- === 的判断条件比==更加严格。一般如果判断变量属性为null 或undefined是用==，其他全部用===。

### JS 中有哪些内置函数 --数据封装类对象

- Object
- Array
- String
- Number
- Boolean
- Function
- Date
- Regexp
- Error
- Math(内置对象)
- JSON(内置对象)

### 创建对象的几种方式

- 字面量
- new Object()
- Object.create(obj)  // obj 作为返回对象的原型对象
- 工厂函数
- 构造函数

### 如何准确判断一个变量是数组类型

* instanceOf
* Object.prototype.toString.call(arr) === '[object Array]'
* Array.isArray(arr) 
* arr.constructor === Array

### instanceof原理

使用：objA instanceof obj2

原理：objA的原型链中是否能找到obj2的原型

### 描述new一个对象的过程

- 在内存中申请一块空间，生成一新对象
- 将this指向这个新对象
- 对this赋值，建立原型链接 obj._ _proto_ _ = Construtor.prototype
- 返回这个新对象

### 源码分析

慕课网课程“zepto设计和源码分析” 、jQuery源码解读

### 继承

* 通过构造函数集成（子类构造函数内部通过对象冒充方式调用父类继承）

  * 缺点：无法继承原型链

* 通过原型链继承（子类原型对象为父类实例对象）

  * 缺点： 无法为父类构造函数设置传递独立的值

* 组合继承 （构造函数集成 + 原型链继承）

* 拷贝继承（？）

* ES6  Class类

  

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

### 闭包的使用场景

> 1. 函数作为返回值
>
> ```javascript
> // 函数作为返回值
> function fn() {
>  var a = 100
>  return function () {
>      console.log(a);
>  }
> }
> 
> var f = fn()
> f()
> ```
>
> 2. 函数作为参数传递
>
> ```javascript
> // 函数作为参数传递
> function fn(callback) {
>     var a = 100
>     callback()
> }
> 
> fn(function () {
>     console.log(a);
> })
> ```
>
> 
>
> 3. 闭包使用示例
>
> ```javascript
> // 1.闭包使用示例
> function creatEle() {
>     var ul = document.createElement('ul')
>     for (var i = 0; i < 10; i++) {
>         var li = document.createElement('li')
>         ;(function (i) {
>             li.innerText = 'li content ' + i
>             li.addEventListener('click', function () {
>                 alert('click' + i)
>             })
>             ul.appendChild(li)
>         })(i)
>     }
> 
>     document.body.appendChild(ul)
> }
> creatEle()
> 
> // 2.闭包使用示例
> function isFirstLoad() {
>     var _list = []
> 
>     return function (id) {
>         if (_list.indexOf(id) >= 0 ) {
>             return false
>         } else {
>             _list.push(id)
>             return true
>         }
>     }
> }
> 
> var firstLoad = isFirstLoad()
> console.log(firstLoad(10)) // true
> console.log(firstLoad(10)) // false
> console.log(firstLoad(20)) // true
> console.log(firstLoad(20)) // false
> ```

### this的使用场景

this 指向的是拥有当前执行环境的对象（当前正在执行的活动对象）

- 构造函数中的this：  this指向实例对象
- 对象属性中的this：  this指向当前对象
- 普通函数中的this：  this指向window
- 定时器中的this： this指向window
- 事件绑定中的this：this指向绑定事件的对象
- 箭头函数中的this：this执行函数定义时的作用域
- call  apply  bind 

### 作用域

变量和声明的作用范围。

- 函数作用域
- 块级作用域（es6）

### 作用域链的理解

- 作用域链：确定了变量的使用范围和变量的查找机制，保证了变量的有序访问
  - 使用范围
    - 变量如果在全局定义，则任何地方都能访问使用
    - 变量如果在局部作用域中定义，则该变量只能在该作用域以及该作用域包含的作用域中可以访问
  - 查找机制
    - 变量在使用的时候首先会在自己的当前作用域内查找，如果找到直接使用
    - 如果未找到则会一级一级向上查找，一直查找到全局（window）作用域。
    - 该过程只要找到该变量，就会直接使用并停止搜索，如果找到全局作用域还未找到，则会报引用错误

### 对异步和同步的理解

- 同步会阻塞后面代码的执行、而异步不会
- 前端使用异步的场景
  - 定时任务： setTimeout setInterval
  - 网络请求： ajax请求，动态资源加载
  - 事件绑定

### 节流与防抖

- 节流

  ```
  function throttle(fn, delay = 500) {
    let timer = null
    return function () {
        if (timer) return;
        fn.apply(this, arguments);
        
        timer = setTimeout(() => {
            clearTimeout(timer)
            timer = null
        }, delay)
    }
  }
  
  function handle() {
    console.log(Math.random());
  }
  window.onscroll = throttle(handle, 1000)
  ```

- 防抖

  ```
  function debounce(fn, interval) {
      let timer = null
      return function() {
          timer && clearTimeout(timer)
          let args = arguments
          fn.apply(this, args)
  
          timer = setTimeout(() => {
              fn.apply(this, args)
          }, interval);
      }
  }
  ```

### 对象拷贝

- 浅拷贝： 以赋值形式的拷贝对象，拷贝的是对象的引用地址
  - Object.assign(target, source[, ...])
  - 展开运算符...
- 深拷贝：建立一个新对象并赋值，修改时源对象不受影响
  - JSON.parse(JSON.stringry( obj ))：性能最好
    * undefined / Symbol / function丢失
    * Error / RegExp {}
    * NaN、Infinity和-Infinity  变成 null
    * 时间对象=>字符串的形式
    * 实例对象丢失constructor

    ```
    let obj = {
        und: undefined, // 丢失
        sym: Symbol('sym'), // 丢失
        fun: () => {},   // 丢失
        nan: NaN,  // null
        inf: Infinity, // null
        err: new Error('error message'), // {}
        reg: /abc/, // {}
        cla: new Ctest(),  // {name: "zs"}
        date: new Date(), // "2021-01-12T05:39:54.991Z"
    }
    ```

  - 递归判断类型，赋值 

### 伪数组转数组

- Array.prototype.slice(likeArr)
- Array.from(likeArr)
- [...likeArr]

```
var nodes = document.getElementsByTagName('*');

// 1.
var nodeArr1 = [].slice.call(nodes)

//2. 
var nodeArr2 = [...nodes]

//3. 
var nodeArr3 = Array.from(nodes)
console.log(nodeArr instanceof Array)
```

### 数组去重

- ES6 new Set()
- 数组遍历赋值判断



## 浏览器

### localStorage、sessionStorage、Cookie的区别及用法

**localStorage、sessionStorage、Cookie共同点：都是保存数据在浏览器端，且同源的。**

1. webstorage

webstorage是本地存储，存储在客户端，包括localStorage和sessionStorage。

2. localStorage

localStorage生命周期是永久，这意味着除非用户显示在浏览器提供的UI上清除localStorage信息，否则这些信息将永远存在。存放数据大小为一般为5MB,而且它仅在客户端（即浏览器）中保存，不参与和服务器的通信。

3. sessionStorage

sessionStorage仅在当前会话下有效，关闭页面或浏览器后被清除。存放数据大小为一般为5MB,而且它仅在客户端（即浏览器）中保存，不参与和服务器的通信。

#### 作用域不同

​	不同浏览器无法共享localStorage或sessionStorage中的信息。相同浏览器的同源页面间可以共享相同的 localStorage，但无法共享sessionStorage的信息。]

#### Cookie

cookie一般用于储存与用户相关的一些数据信息，每次HTTP请求都会携带cookie数据到服务器端。且每条cookie都具有自己的生命期，为只在设置的cookie过期时间之前有效。存放数据大小为4K左右 。有个数限制（各浏览器不同），一般不能超过20个。

- 使用cookie主要要考虑其两大特性：

1. 因为每次HTTP请求都携带会cookie到服务器端，如果使用cookie保存过多数据势必会增大带宽，带来性能问题。
2. 安全性，因为cookie存储在浏览器端，所以就存在被拦截的可能。所以不能cookie来保存用户一些太私密的信息。可以用服务器端session来保存。

### 重绘与回流

* Reflow 回流(重排)
  * 定义
    * Dom结构中的每个元素都有自己的盒子模型
    * 每个盒子模型在页面中出现的具体位置，都是由其相关的各种样式计算出来的
    * 如果某个属性触发了该元素在页面中的布局发生改变，就会触发回流
  * 触发reflow
    * 添加、修改、或删除DOM节点时，会导致reflow或repaint
    * 移动dom节点位置，比如动画
    * 修改布局相关css样式属性
    * resize窗口，或者滚动
    * 修改网页默认字体
* Repaint 重绘
  * 定义
    * 当各种盒子的位置、大小，颜色以及其他属性确定下来以后，浏览器便会把这些元素按照各自特性绘制一遍，最终呈现到页面，该过程称之为repaint
  * 触发repaint
    * dom改动
    * css改动

`重绘不一定回流、回流一定重绘！`

## 通信类

1. ajax

2. 同源策略

   - 协议、域名、端口

3. 跨域

   限制：

   - 不能进行ajax请求
   - 无法获取dom
   - 无法获取cookie、localstorage等

   解决方案：

   - JSOP
   - CORS
   - WebSocket
   - proxy

   页面间跨域：

   - hash: onHashchange事件
   - postMessage

### get和post的区别

- 传参方式：GET使用url传参，而POST是通过请求体传参
- 安全性：GET比POST更不安全，参数信息直接暴露在url中
- 缓存：GET请求url会主动被浏览器缓存，而POST不会
- 回退：GET请在浏览器中回退是无害的，而POST会再次请求
- 编码方式：GET请求支持url编码，而POST支持多种编码方式
- 长度限制：GET请求有长度限制，而post没有

### ajax 封装

```javascript
function ajax(option) {
  //用户配置option 默认配置init
  var init = {
    type: 'get',
    async: true,
    url: '',
    success: function() {},
    error: function() {},
    data: {},
    beforeSend: function() {
      console.log('发送前...')
      return false
    }
  }
  //TODO step1: 合并参数
  for (k in option) {
    init[k] = option[k]
  }
  //TODO step2: 参数转换
  var params = ''
  for (k in init.data) {
    params += '&' + k + '=' + init.data[k]
  }
  var xhr = new XMLHttpRequest()
  // type url
  //TODO step3: 区分get和post,进行传参
  var url = init.url + '?__=' + new Date().getTime()
  //TODO step4: 发送前
  var flag = init.beforeSend()
  if (!flag) {
    return
  }
  if (init.type.toLowerCase() == 'get') {
    url += params
    xhr.open(init.type, url, init.async)
    xhr.send()
  } else {
    xhr.open(init.type, url, init.async)
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
    xhr.send(params.substr(1))
  }
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if ((xhr.status >= 200 && xhr.status <= 207) || xhr.status == 304) {
        init.success(xhr.responseText)
      } else {
        //error
        init.error()
      }
    }
  }
}

```

### JSONP 原理及封装

```javascript
function success(data) {
  console.log(data)
}
jsonp({
  url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
  type: 'get',
  data: {
    wd: 'jsonp'
  },
  callback: 'cb',
  success: success
})
function jsonp(options) {
  var url = options.url
  var data = options.data

  format(data, options, function(str, callback) {
    var oBody = document.getElementsByTagName('body')[0]
    var oScript = document.createElement('script')
    oScript.setAttribute(
      'src',
      url + '?' + str + options.callback + '=' + callback
    )
    oBody.appendChild(oScript)
  })
  return options.success
}
function format(data, options, callback) {
  var callbackName = ''
  var str = ''
  for (var p in data) {
    //格式化get提交的参数
    str += p + '=' + data[p] + '&'
  }
  for (var p in options) {
    if (options[p] == options.success) {
      //取出要返回的函数名
      callbackName = p
      callback && callback(str, callbackName)
    }
  }
}

```

如果是这么写success:function(data){conosle.log(data);}
会报一个success is undefined错误，success必须先定义



## HTTP协议类

1. HTTP的特点

   * 简单快速
     * 每一个资源都有其对应的url(统一资源定位符)，只需要输入对应的url就能获取到对应的资源
   * 灵活
     * 通过设置HTTP协议头，可以完成对不同类型资源的传输
   * 无连接
     * 对连接状态不会进行保持
   * 无状态
     * 不会对用户状态进行保留

2. HTTP报文的组成

   * 请求报文
     * 请求行
       * 请求方式
       * 请求路径
       * 协议及版本
     * 请求头
     * 空行
     * 请求体
   * 响应报文
     * 状态行
       * 协议及版本
       * 状态码
       * 状态字
     * 响应头
     * 空行
     * 响应体

3. HTTP方法

   * HTTP1.0定义了三种请求方法： GET, POST 和 HEAD方法。

   * HTTP1.1新增了五种请求方法：OPTIONS, PUT, DELETE, TRACE 和 CONNECT 方法

4. POST和GET的区别

   * GET使用url传参，而POST是通过请求体传参
   * GET比POST更不安全，参数信息直接暴露在url中
   * GET请求url会主动被浏览器缓存，而POST不会
   * GET请在浏览器中回退是无害的，而POST会再次请求
   * GET请求支持url编码，而POST支持多种编码方式
   * GET请求有长度限制，而post没有

5. HTTP状态码

   * 1xx：请求已接收，继续处理
   * 2xx：请求已成功接收响应
     * 200：请求成功/强缓存
   * 3xx：重定向
     * 301：永久重定向
     * 302：临时重定向
     * 304： 协商缓存
   * 4xx：客户端错误
     * 400 ： 请求错误
     * 401：请求未授权
     * 403：forbidden禁止访问
     * 404：请求资源不存在
   * 5xx：服务端错误
     * 500：服务端错误



## 安全

### 前端安全攻击

1. xss 跨站脚本攻击
2. corf 跨站请求伪造
   * token验证
   * Referer验证：判断页面来源
   * 令牌

### 错误监控

#### 错误类别

1. 即时运行错误：代码错误
2. 资源加载错误

#### 捕获方式

1. 即时运行错误捕获方式
   * try...catch
   * window.onerror

2. 资源加载错误
   * object.onerror
   * performance.getEntries()
   * Error事件捕获（window.addEventLitener('error', fn, true)）
     * 资源error不会冒泡，无法通过window.onerror冒泡捕获
     * 可以通过事件的捕获阶段捕获

### 错误上报

1. 利用Ajax通讯
2. 利用Image对象
   * new Image并设置src(不需要放置到页面上)

## 算法

1. 排序
2. 递归
3. 堆栈、队列、链表

## 性能

### 页面性能优化

1. 资源压缩合并，减少HTTP请求
2. 非核心代码异步加载
3. 利用浏览器缓存
4. 使用cdn
5. 预解析

### 异步加载方式

1. 方式
   * 动态创建script标签
   * async
   * defer
2. 区别
   * async是在页面加载完后立即执行，如果是多个，执行顺序与加载顺序无关
   * defer是在HTML解析完后才会执行，如果是多个，按照加载顺序依次执行

### 浏览器缓存

1. 强缓存
   * header
     * Expires
     * Cache-Control
2. 协商缓存
   * header
     * Last-modified（下发）  
     * If-Modified-Since （上传）
     * Etag
     * If-None-Match

## 学习链接

[](https://www.evernote.com/shard/s276/sh/4c926b86-f8c2-4a0e-9916-
f053a77e221c/53c09ab091b793bbf55d9798ce39b6dd)



[](https://www.evernote.com/shard/s276/sh/e4cc7abe-2a71-4113-ac7ca236bd6a8438/
5760a35ca327854a6249586b2ec8f09d)



[](https://www.evernote.com/shard/s276/sh/f843d47d-4b9a-436e-b0e9-
105c5c9c1c26/71e9cf0204bc0bb3ac8c40347d5acf78)

[前端面试的面试经验(含答案)](https://juejin.im/post/5b44a485e51d4519945fb6b7)