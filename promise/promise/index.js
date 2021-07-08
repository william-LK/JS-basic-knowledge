// Promise 是一个类 承诺 允诺  （异步解决方案）
// pending 等待状态 -> resolved 成功态
// pendding 等待状态 -> rejected 失败态
// 不能从成功态转化成失败态
// executor函数 而且会立即执行 参数是resolve函数 reject
// 每个promise实例都有一个then方法
// 每个promise可以监听多个then
let Promise = require("./promise");
let promise = new Promise(function (resolve, reject) { //executor
    console.log(1);
    setTimeout(() => {
        resolve('玩具少');
    })

    // reject("玩具多")
});
promise.then(function (val) {
    console.log(val, 'success')
}, function (err) {
    console.log(err, 'fail')
})
promise.then(function (val) {
    console.log(val, 'success')
}, function (err) {
    console.log(err, 'fail')
})
promise.then(function (val) {
    console.log(val, 'success')
}, function (err) {
    console.log(err, 'fail')
})
console.log(2);