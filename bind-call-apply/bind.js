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
                this instanceof nop ? this : thisArg,
                args.concat(Array.prototype.slice.call(arguments))
            );
        };
    if (this.prototype) {
        nop.prototype = this.prototype;
    }
    // 修改绑定函数的原型指向
    bound.prototype = new nop();

    return bound;
};