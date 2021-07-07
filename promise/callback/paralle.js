// 并发调用接口 两个ajax ajax1 => name ajax2 => age = name + age

let fs = require('fs'); // fileSystem
let path = require('path');
let school = {};

function after(times, callback) {
    let result = {};
    return function (key, data) {
        result[key] = data;
        // 计算器
        if (--times === 0) {
            callback(result);
        }
    }
}

let newFn = after(2, function (result) { // 这个方法 会在所有异步执行之后执行
    console.log(result);
})
fs.readFile(path.join(__dirname, './name.txt'), 'utf8', function (err, data) {
    if (err) return console.log(err);
    console.log(data);
    newFn("name", data);
    // school.name = data;
});

fs.readFile(path.join(__dirname, './age.txt'), 'utf8', function (err, data) {
    if (err) return console.log(err);
    console.log(data);
    newFn("age", data);
    // school.age = data;
});

// 串行 两个人有关系 上一个人的输出是下一个人的输入
// 并行 两个人没关系 可以一期执行

// 前端面试中 发布订阅（promise原理） 观察者模式