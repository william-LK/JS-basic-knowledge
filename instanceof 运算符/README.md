## instanceof 
instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
> 原理： L 的 __proto__ 是不是等于 R.prototype，不等于再找 L.__proto__.__proto__ 直到 __proto__ 为 null

### 手写一个instanceof
```js
// L 表示左表达式，R 表示右表达式
function instance_of(L, R) {
  var O = R.prototype;
  L = L.__proto__;
  while (true) {
    if (L === null) return false;
    // 这里重点：当 O 严格等于 L 时，返回 true
    if (O === L) return true;
    // 链表遍历
    L = L.__proto__;
  }
}
```
### 特殊情况
```js
// 正常情况
function B(){}
let b = new B();
console.log(b instanceof B); // true

// 特殊情况
function A(){
    return {};
}
let a = new A();
console.log(a instanceof A); // false; 因为构造函数如果有返回值，new 的实例 就是该返回值，而该实例直接指向 Object，没有指向该构造函数，所以为false；
```