# notes
#
#
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

## JSONP 原理及封装
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
