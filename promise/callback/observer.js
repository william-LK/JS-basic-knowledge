// 观察者模式  基于发布订阅模式
// 发布订阅 发布和订阅 两者无关
// 观察者模式 观察者 和 被管擦着
// 被观察者 应该存放着观察者
// 被观察这状态变化 要更新自己身上的所有的观察者
// 被观察者
class Subject {
    constructor() {
        this.state = '开心';
        this.arr = [];
    }
    attach(observer) { // 装载观察者的
        this.arr.push(observer);
    }
    setState(newState) {
        this.state = newState;
        this.arr.forEach(observer => observer.update(newState))
    }
}
// 观察者
class Observer { // 我
    constructor(who) {
        this.who = who;
    }
    update(newState) { // 原型上的方法
        console.log(this.who + newState + '了');
    }
}
let subject = new Subject();
let my1 = new Observer("我");
let my2 = new Observer("媳妇")
subject.attach(my1);
subject.attach(my2);
subject.setState('大哭');