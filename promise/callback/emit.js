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
    this._arr.forEach(fn => fn.apply(this,arguments));
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
