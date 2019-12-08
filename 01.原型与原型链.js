// 1.如何准确判断一个变量是数组类型

var arr= []
arr instanceof Array // true
typeof arr // Object 无法准确判断

// 2. 写一个原型链继承的例子

function  Animal() {
    this.eat = function () {
        console.log('animal eat')
    }
}
function Dog(name) {
    this.name = name
}
Dog.prototype = new Animal()
var myDog = new Dog('二哈')
console.log(myDog.name, myDog.eat());


// 原型链继承
function Ele(id) {

}

Ele.prototype.html = function (val) {
    var ele = this.ele
    if (val) {
        ele.innerHTML = val
        return this // 链式调用
    } else {
        return ele.innerHTML
    }
}

Ele.prototype.on = function (type, fn) {
    var ele = this.ele
    ele.addEventListener(type, fn)
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

// 原型链继承

function Common() {
    this.html = function (val) {
        if (val) {
            this.ele.innerHTML = val
            return this // 链式调用
        } else {
            return this.ele.innerHTML
        }
    }

}

function Ele(id) {
    this.ele = document.getElementById(id)
}
Ele.prototype = new Common()
Ele.prototype.constructor = Ele

var box = new Ele('lg')
box.html('test')
