function Promise(executor) {
    // 给promise定义状态
    this.status = 'pending';
    // 成功和失败的原因
    this.value = undefined;
    this.reason = undefined;
    let self = this;

    // 定义两个队列 存放回调的函数
    self.onResolveCallbacks = []; //存放成功的回调
    self.onRejecteCallbacks = []; //存放失败的回调

    function resolve(value) {
        // 锁定状态
        if (self.status !== 'pending') return;
        self.value = value;
        self.status = 'fulfilled';
        self.onResolveCallbacks.forEach(fn => fn());
    }

    function reject(reason) {
        // 锁定状态
        if (self.status !== 'pending') return;
        self.reason = reason;
        self.status = 'rejected';
        self.onRejecteCallbacks.forEach(fn => fn());
    }

    // 执行器 立刻执行 监听then中的报错
    try {
        executor(resolve, reject);
    } catch (error) {
        // 如果报错 调用then方法的失败方法即可
        reject(error);
    }
}

// promise2 就是当前then返回的promise
// x就是当前then中成功或者失败回调的返回结果
// 因为此方法 可能混着别人逻辑 所以尽可能考虑周全
function resolvePromise(promise2, x, resolve, reject) {
    // 对x进行判断 如果x是普通值 直接resolve就可以了
    // 如果x是一个promise 采用x的状态
    if (promise2 === x) {
        return reject(new TypeError('循环引用'));   
    }
    // 这种情况就有可能x 是一个promise了
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        let called; // 防止重复调用； 
        try {
            let then = x.then; // 看当前的promise有没有then方法
            if (typeof then === 'function') { // {then:undefined}
                then.call(x, y => {
                    if (called) return; // 防止调用失败 有调用成功
                    called = true;
                    // 如果返回的是一个promise这个promise，resolve的结果可能还是一个promise，递归解析直到这个y是一个常量位置
                    resolvePromise(promise2, y, resolve, reject);
                }, r => {
                    if (called) return;
                    called = true;
                    reject(r);
                }); // 用刚才取出的then方法 不要再去取值了 如果再取可能又会发生异常
            } else {
                resolve(x);
            }
        } catch (error) {
            if (called) return;
            called = true; // 这个判断为了防止出错后 继续要调用成功逻辑
            reject(error);
        }
    } else {
        resolve(x);
    }
}


Promise.prototype.then = function (onfulfilled, onrejected) {
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : val => val;
    onrejected = typeof onrejected === 'function' ? onrejected : err => { throw err };

    let self = this;
    //  每个promise必须返回一个新的状态 保证可以链式调用
    let promise2 = new Promise((resolve, reject) => {
        if (self.status === 'fulfilled') {
            setTimeout(() => {
                try {
                    let x = onfulfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            })
            onfulfilled(self.value);
        }
        if (self.status === 'rejected') {
            setTimeout(() => {
                try {
                    let x = onrejected(self.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(error)
                }
            })
        }
        if (self.status === 'pending') {// 发布订阅 如果是异步的时候，需要把成功和失败 分别放到数组里，发布订阅，如果稍后调用了resolve 会让函数一次执行，执行的时候 会将成功或者失败的值进行传递
            self.onResolveCallbacks.push(function () {
                onfulfilled(self.value);
            });
            self.onRejecteCallbacks.push(function () {
                onrejected(self.reason);
            });
        }
    })
    return promise2;
}
// 
Promise.reject = function (reason) {
    return new Promise(function (resolve, reject) {
        reject(reason);
    })
}
Promise.resolve = function (value) {
    return new Promise(function (resolve) {
        resolve(value);
    })
}
// catch是then的简写
Promise.prototype.catch = function (errCallback) {
    return this.then(null, errCallback);
}
// 手写延迟方法
Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}
module.exports = Promise;