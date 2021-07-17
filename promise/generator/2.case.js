
// function* read() { // 生成器会配合yield 来使用  如果碰到yiled 就会暂停执行
//     let a = yield 1; // 产出
//     console.log(a);
//     let b = yield 2;
//     console.log(b);
//     let c = yield 3;
//     console.log(c);
// }
// // 生成器返回的是迭代器 迭代器有next方法  调用next可以返回 value 和 done
// let it = read();
// console.log(it.next()); // 第一次next是不能传递参数
// console.log(it.next(100));
// console.log(it.next(200));
// console.log(it.next(300));


// async + await es7 => generator + co
let fs = require('mz/fs');
function* read() {
    let r = yield fs.readFile('./name.txt', 'utf8');
    let age = yield fs.readFile(r, 'utf8');
    let e = yield [age];
    return e;
}
function co(it) {
    return new Promise((resolve, reject) => {
        function next(val) {
            let { value, done } = it.next(val);
            if (done) {
                return resolve(value);
            }
            // 如果不是promise 把他包装成promise
            Promise.resolve(value).then(data => {
                next(data);
            }, reject);
        }
        next();
    })
}

let it = read();



// let { value, done } = it.next();
// value.then(data => {
//     let { value, done } = it.next(data);
//     value.then(data => {    
//         it.next(data);ƒ
//     })
// });
