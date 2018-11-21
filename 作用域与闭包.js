
// 作用域
var a = 100
function fn1() {
    var b = 200
    function fn2() {
        var c = 300
        console.log(a)
        console.log(b)
        console.log(c)
    }
    fn2()
}
fn1()

// this 作为普通函数使用
function f1() {
    console.log(this);

}
f1()

function f2() {
    var a = 2
    function f3() {
        console.log(a);
        console.log(this);
    }
    f3()
}
f2()

// 函数作为返回值
function fn() {
    var a = 100
    return function () {
        console.log(a);
    }
}

var f = fn()
f()

// 函数作为参数传递
function fn(callback) {
    var a = 100
    callback()
}

fn(function () {
    console.log(a);
})

// 闭包使用示例
function creatEle() {
    var ul = document.createElement('ul')
    for (var i = 0; i < 10; i++) {
        var li = document.createElement('li')
        ;(function (i) {
            li.innerText = 'li content ' + i;
            li.addEventListener('click', function () {
                alert('click' + i)
            })
            ul.appendChild(li)
        })(i)
    }

    document.body.appendChild(ul)
}
creatEle()

// 闭包使用示例
function isFirstLoad() {
    var _list = []

    return function (id) {
        if (_list.indexOf(id) >= 0 ) {
            return false
        } else {
            _list.push(id)
            return true
        }
    }
}

var firstLoad = isFirstLoad()
console.log(firstLoad(10)) // true
console.log(firstLoad(10)) // false
console.log(firstLoad(20)) // true
console.log(firstLoad(20)) // false
