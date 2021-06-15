
// 事务实现
function perform(anyMethod, wrappers) {
    wrappers.forEach(wrappers => wrappers.initialize());
    anyMethod();
    wrappers.forEach(wrappers => wrappers.close());
}

let newFn = perform(function () { console.log("say") }, [{
    initialize() {
        console.log('wrapper1 beforesay')
    },
    close() {
        console.log('wrapper2 aftersay')
    }
}])

