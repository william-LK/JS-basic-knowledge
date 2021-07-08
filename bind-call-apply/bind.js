Function.prototype.bind = function (thisArg) {
    if (typeof this !== 'function') {
        throw TypeError("Bind must be called on a function");
    }
    const args = Array.prototype.slice.call(arguments, 1),
        self = this,
        nop = function () { },
        // 绑定的函数
        bound = function () {
            return self.apply(
                this instanceof nop ? this : thisArg, // new 的过程中，内部创建对象会指向构造器的原型对象，所以在这里加判断，可以区分new和直接执行
                args.concat(Array.prototype.slice.call(arguments))
            );
        };
    // 构造函数不存在prototype 所以也不能被new
    if (this.prototype) {
        // 中间层 指向 调用bind的对象，就是原来函数本身
        nop.prototype = this.prototype;
    }
    // 修改绑定函数的原型指向 为了后面的apply绑定  将bind之后的函数 指向中间层
    bound.prototype = new nop();
 
    return bound;
};

let a = function () { console.log(this) };
let b = { name: 'b' }
let d = { name: 'd'}
let c = a.bind(b);
c();
new c();