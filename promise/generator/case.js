// generator 生成器 iterator 迭代器

// 类数组 有长度 有索引 是个对象 能被迭代
// 标识 Symbol(iterator)
// Array.from 和 [...] 的区别
// 给一个对象添加迭代器 可以被迭代
// 这个函数执行后返回的是一个迭代器 （迭代器有一个next方法，每次调用后都会返回 value，done 两个属性）
let obj = {
    0: 1, 1: 2, 2: 3, length: 3, [Symbol.iterator]: function () {
        let self = this;
        let index = 0;
        return { // 迭代器 里面有value
            next() {
                return { value: self[index], done: index++ === self.length }
            }
        }
    }
}

let obj = {
    0: 1, 1: 2, 2: 3, length: 3, [Symbol.iterator]: function* () {
        // 每次浏览器都会不停的调用next方法 把yield的结果作为值
        let index = 0;
        while(index !== this.length){
            yield this[index++];
        }
    }
}

function arg() {
    console.log(arguments);
}

arg(1, 2, 3, 4, 5);