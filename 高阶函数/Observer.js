// vue 特点 数据变化 更新视图，监控数据变化，数据变化后需要更新视图

// 被观察者
class Subject{ // 我家宝宝
    constructor(){
        this.state = '很开心';
        this.arr = [];
    }
    // 订阅
    attach(o){
        this.arr.push(o);
    }
    setState(newState){
        this.state = newState;
        this.arr.forEach(o => o.update(newState));
    }
}


// 观察者 
class Observer { // 我
    constructor(name) {
        this.name = name;
    }
    update(newState){
        console.log(this.name + ': 小宝宝的状态是' +newState);
    }
}

let s = new Subject('小宝宝');
let o1 = new Observer('我');
let o2 = new Observer('媳妇');
s.attach(o1);
s.attach(o2);
s.setState("不开心");

// promise 有那些优缺点
//优 1） 可以解决异步嵌套问题  2） 可以觉得多个异步并发问题
//缺 1） promise基于回调  2） promise 无法终止异步
// 解决办法 async await