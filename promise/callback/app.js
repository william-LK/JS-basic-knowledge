// 装饰器 前端埋点 在ajax 的请求中包装一层自己的逻辑
Function.prototype.before = function (callback) {
    let that = this;
    return function () { // 这个函数中的this 指的是 newFn()前面的 this
        callback(); // before的参数
        that.apply(that, arguments);
    }
}
function fn(val) {
    console.log("一定的功能" + val);
}

let newFn = fn.before(function () {
    console.log('在函数执行前执行')
})
newFn('你好');