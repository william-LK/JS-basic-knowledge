/**
 * 深拷贝
 * 有三个重点是： 
 * 1. 要知道判断数据类型的办法。
 * 2. 根据不同数据类型进行处理，比如function时要怎么处理，正则时需要怎么处理
 * 3. 还必须要留意是否有循环应用以免出现爆栈的情况，通过一个hash进行处理
 * 其中判断类型的方法 推荐使用 toString, 因为typeof 只能处理 基本数据类型的判断，如array和object就无法区分， instanceof 只能对比实例与类的关系，基本数据类型无法判断
 * 最好的办法是：使用toString就能得出所有类型的真实情况
 */
 const hash = new WeakMap();

 // 深拷贝
 function getType(obj) {
     const str = Object.prototype.toString.call(obj);
     const map = {
         '[object Boolean]': 'boolean',
         '[object Number]': 'number',
         '[object Function]': 'function',
         '[object Array]': 'array',
         '[object Date]': 'date',
         '[object RegExp]': 'regExp',
         '[object Undefined]': 'undefined',
         '[object Null]': 'null',
         '[object Object]': 'object',
     };
     if (obj instanceof Element) {
         return 'element';我
     }
     return map[str];
 }
 
 function deepCopy(ori) {
     const type = getType(obj);
     switch (type) {
         case 'array':
             return transform(copyArray, ori);
         case 'object':
             return transform(copyObject, ori);
         case 'function':
             return transform(copyFunction, ori);
         case 'date':
             return transform(copyDate, ori);
         case 'regExp':
             return transform(copyRegExp, ori);
         case 'element':
             return transform(copyElement, ori);
         default:
             return ori;
     }
 }
 
 function transform(fn, ori) {
     if (hash.has(ori)) return ori;
     let copy = fn(ori);
     hash.set(ori, copy);
     return copy;
 }
 
 // 复制元素
 function copyElement(ori) {
     return ori.cloneNode(true);
 }
 
 // 复制数组
 function copyArray(ori) {
     if (hash.has(ori)) {
         return hash.get(ori);
     }
     let copy = [];
     for (const [key, value] of Object.entries(ori)) {
         copy[key] = deepCopy(value);
     }
     hash.set(ori, copy);
     return copy;
 }
 // 复制日期
 function copyDate(ori) {
     return new Date(ori);
 }
 // 复制正则
 function copyRegExp(ori) {
     return new RegExp(ori);
 }
 // 复制对象
 function copyObject(ori) {
     let copy = {};
     for (const [key, value] of Object.entries(ori)) {
         copy[key] = deepCopy(value);
     }
     return copy;
 }
 // 复制函数
 function copyFunction(ori) {
     return Object.assign(ori);
 }
 
 
 let obj = { a: 1, b() { console.log(1) } };
 obj.xxx = obj;
 obj.yyy = obj.b;
 console.log(obj);