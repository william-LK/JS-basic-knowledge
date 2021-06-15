// promise 的特点
// 承诺 我答应你... promise是一个类
// 1）里面有三个状态 等待状态（默认） 成功态 失败态 一旦成功了就不能失败，反过来一样

let promise = new Promise((resolve,reject) => { // executor 执行者
    console.log(1)
})
console.log(2)