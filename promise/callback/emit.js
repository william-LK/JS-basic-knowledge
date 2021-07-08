let fs = require('fs');
let path = require('path');
// 发布 订阅 【fn，fn】


function EventEmitter() {
    this._arr = [];
}

EventEmitter.prototype.on = function (callback) {
    this._arr.push(callback);
}

EventEmitter.prototype.emit = function () {
    this._arr.forEach(fn => fn.apply(this, arguments));
}

let e = new EventEmitter();
let school = {};
e.on(function (key, data) {
    school[key] = data;
    if (Object.keys(school).length === 2) {
        console.log(school);
    }
})

fs.readFile(path.join(__dirname, './name.txt'), 'utf8', function (err, data) {
    if (err) return console.log(err);
    e.emit('name', data);
});

fs.readFile(path.join(__dirname, './age.txt'), 'utf8', function (err, data) {
    if (err) return console.log(err);
    e.emit('age', data);
});

// 订阅发布模式  -->   同一个类边  订阅发布无关   订阅方   发布方   消息中心  vuex 消息广播
// 观察者模式 --> 两个类 被观察者同观察者有一定关联   观察者  被观察者  vue 
