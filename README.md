# notes
#
# 1. localStorage、sessionStorage、Cookie的区别及用法

>###localStorage、sessionStorage、Cookie共同点：都是保存数据在浏览器端，且同源的。

### webstorage
> webstorage是本地存储，存储在客户端，包括localStorage和sessionStorage。

### localStorage
> localStorage生命周期是永久，这意味着除非用户显示在浏览器提供的UI上清除localStorage信息，否则这些信息将永远存在。存放数据大小为一般为5MB,而且它仅在客户端（即浏览器）中保存，不参与和服务器的通信。

### sessionStorage
> sessionStorage仅在当前会话下有效，关闭页面或浏览器后被清除。存放数据大小为一般为5MB,而且它仅在客户端（即浏览器）中保存，不参与和服务器的通信。

####作用域不同
>不同浏览器无法共享localStorage或sessionStorage中的信息。相同浏览器的同源页面间可以共享相同的 localStorage，但无法共享sessionStorage的信息。

### Cookie
> cookie一般用于储存与用户相关的一些数据信息，每次HTTP请求都会携带cookie数据到服务器端。且每条cookie都具有自己的生命期，为只在设置的cookie过期时间之前有效。存放数据大小为4K左右 。有个数限制（各浏览器不同），一般不能超过20个。
####使用cookie主要要考虑其两大特性：
1. 因为每次HTTP请求都携带会cookie到服务器端，如果使用cookie保存过多数据势必会增大带宽，带来性能问题。
2. 安全性，因为cookie存储在浏览器端，所以就存在被拦截的可能。所以不能cookie来保存用户一些太私密的信息。可以用服务器端session来保存。

