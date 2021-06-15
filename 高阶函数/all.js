let fs = require('fs');


// function out(){
//     if ( Object.keys(school).length === 100){
//         console.log(school);
//     }
// }

function after(times, cb) {
    let school = {};
    return function (key, value) {
        school[key] = value;
        if (--times == 0) { // 如果达到次数就执行after方法的回调函数
            cb(school); //并且将结果返回
        }
    }
}

let out = after(2, function (result) { // 公用处理异步方式
    console.log(result)
})

// 要求同时获取两个结果，不能串行
// 同时写两个异步方法
fs.readFile('./name.txt', 'utf8', function (err, data) {
    console.log(data);
    school.name = data;
    out();
});

fs.readFile('./age.txt', 'utf8', function (err, data) {
    school.age = data;
    out();
})

// 1）通过回调函数来解决 after函数
// 2）发布订阅模式
