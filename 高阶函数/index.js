// 回调函数是高阶函数的一种

// 高阶函数 1） 如果函数的参数是一个函数  或者 2） 如果一个函数返回了一个函数（返回函数就是高阶函数）

// 常见高阶函数的应用 
// 有一个核心功能

// AOP 面向切片编程，重写一些方法
function say(who){
    // todo...
    console.log(who + '说话')
}

Function.prototype.before = function(beforeFunc){
    // this === say
    // 剩余运算符 将所有参数组合成一个数组，注意剩余运算符只能在最后一个参数里调用
    return (...args) => {  // newFn 箭头函数没有this，没有arguments 没有原型
        beforeFunc();
        this(...args); // 展开
    }
}

let newFn = say.before(function(){
    console.log('说话前')
});
newFn("我"); // 看调用函数之前的上下文


// vue2.0 也会利用 函数劫持 aop
let oldPush = Array.prototype.push;

function push(...args){ // call的用法 1） 改变this的指向 2）让函数执行
    oldPush.call(this,...args);
}
let arr = [1,2,3];
push.call(arr,4,5,6,7); // 在调用push方法时，触发一句更新操作
console.log(arr);

// react setState 事务机制  就是 aop编程
