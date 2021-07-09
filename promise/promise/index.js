// Promise 是一个类 承诺 允诺  （异步解决方案）
// pending 等待状态 -> resolved 成功态
// pendding 等待状态 -> rejected 失败态
// 不能从成功态转化成失败态
// executor函数 而且会立即执行 参数是resolve函数 reject
// 每个promise实例都有一个then方法
// 每个promise可以监听多个then
// promise怎么变成失败态
// 1. reject
// 2. new Error
// 链式调用 
// 1）如果then方法中返回的是一个promise 那我就采用这个promise的状态 作为成功或者失败，把promise的结果作为参数
// 2)如果返回的是一个普通值 直接作为下一个then的成功的参数
// 3) 在then方法中抛出异常 也会走失败 如果错误中返回一个普通值 也会变成成功态
// * 每一个then方法都返回一个新的promise
// let Promise = require("./promise");

let fs = require('fs');
let path = require('path');
let name = path.join(__dirname, "./name.txt");
function read(url) {
    return new Promise((resolve, reject) => {
        fs.readFile(url, 'utf8', function (err, data) {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

read(name).then(data => {
    // 如果返回的是一个promise 会让这个promise执行，并且采用他的状态作为下一个then成值
    console.log(data);
    return read(data + "1");
}).then(data => {
    console.log(data)
}, err => {
    console.log(err, 'err');
})