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

Promise.prototype.then = function (onfulfilled, onrejected) {
    let self = this;
    if (self.status === 'fulfilled') {
        onfulfilled(self.value);
    }
    if (self.status === 'rejected') {
        onrejected(self.reason);
    }
    if (self.status === 'pending') {// 发布订阅 如果是异步的时候，需要把成功和失败 分别放到数组里，发布订阅，如果稍后调用了resolve 会让函数一次执行，执行的时候 会将成功或者失败的值进行传递
        self.onResolveCallbacks.push(function () {
            onfulfilled(self.value);
        });
        self.onRejecteCallbacks.push(function () {
            onrejected(self.reason);
        });
    }
}
module.exports = Promise;