## new 运算符是什么
> new 运算符会创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一。

### new 运算符执行时，发生了什么？
1. 创建一个新对象；
2. 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）
3. 执行构造函数中的代码（为这个新对象添加属性）
4. 返回新对象。

### 手写一个new
```js
function myNew(){
    // 创建一个实例对象
    var obj = new Object();
    // 取得外部传入的构造器
    var Constructor = Array.protoype.shift.call(arguments);
    // 实现继承，实例可以访问构造器的属性；
    obj.__proto__ = Constructor.prototype;
    // 调用构造器，并改变其 this 指向到实例；
    var ret = Constructor.apply(obj,arguments);
    // 如果构造函数返回值是对象则返回这个对象，如果不是对象则返回新的实例对象
    return typeof ref === 'object' && ret !== null ? ret : obj;
}
```