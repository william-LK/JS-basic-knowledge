let fs = require('fs');
const path = require('path');
const age = path.join(__dirname, './age.txt');
const name = path.join(__dirname, './name.txt');
// node 中的所有方法 都是错误有限 第二个就是结果
// function read(url) {
//     return new Promise((resolve, reject) => {
//         fs.readFile(url, 'utf8', (err, data) => {
//             if (err) return reject(err);
//             resolve(data);
//         })
//     })
// }
// // 写入
// function write(url) {
//     return new Promise((resolve, reject) => {
//         fs.writeFile(url, 'utf8', (err, data) => {
//             if (err) return reject(err);
//             resolve(data);
//         })
//     })
// }

function promisify(fn) { // 把方法promise化
    return function () {
        return new Promise((resolve, reject) => {
            fn(...arguments, function (err, data) {
                if (err) reject(err);
                resolve(data);
            })
        })
    }
}
function promisifyAll(obj){
    for(let key in obj){
        if(typeof obj[key] === 'function'){ // 遍历整个对象 如果是函数的 我就把方法重写
            obj[key + 'Async'] = promisify(obj[key]); // 把每个方法都promise化
        }
    }
}
// let fsAsync = promisifyAll(fs);

let read = promisify(fs.readFile);
read(name).then(data => console.log('读取成功'));
/**
 * 
 * 1. 返回一个新的promise
 * 2. 注册一个processData方法，内含计数器
 * 3. 遍历传入的数值，如果是常量立刻调用计数器
 * 4. 如果是promise则在调用后使用计数器，由于then为异步，需留意i的值是否会被修改建议是使用let或者闭包
 * 
 */
Promise.all = function (values) {
    return new Promise((resolve, reject) => {
        let arr = [];
        let count = 0;
        function processData(key, value) {
            arr[key] = value; // 将结果和数据 对应起来
            // 计数器
            if (++count === values.length) {
                resolve(arr); // 成功后 把结果跑出来
            }
        }
        for (let i = 0; i < values.length; i++) {
            let current = values[i];
            let then = current.then;
            if (then && typeof then === 'function') { // 是一个promise
                then.call(current, y => { // 是promise的就让promise执行
                    processData(i, y);
                }, reject); // 如果其中一个promise出错 就停止执行
            } else {
                processData(i, current); // 常量直接返回
            }
        }
    })
}
/**
 * 
 * 1.返回一个新的promise
 * 2.遍历传入的值做判断，如果是拥有then，且then为函数，则默认为promise，通过call调用，在成功或者失败时调用新promise的停止方法；
 * 3.如果传入的是常量，则立刻完成，所以按传入顺序立刻执行
 * 
 */
Promise.race = function (values) {
    // 返回一个新的promise
    return new Promise((resolve, reject) => {
        for (let i = 0; i < values.length; i++) {
            let current = values[i];
            let then = current.then;
            if (then && typeof then === 'function') { // 是一个promise
                then.call(current, y => { // 是promise的就让promise执行
                    resolve(y); // 立刻执行一个
                }, reject); // 如果其中一个promise出错 就停止执行
            } else {
                resolve(current);
            }
        }
    })
}
// Promise.all([read(age), read(name), 1, 2, 3]).then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// })
// Promise.race([read(age), read(name), 1, 2, 3]).then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// })