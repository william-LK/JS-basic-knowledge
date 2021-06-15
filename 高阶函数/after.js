// after 在 ...之后

function after(times,callback){ // 闭包
    return function(){
        if(--times === 0){
            callback();
        }
    }
}

let fn = after(3,function(){ // 真正执行的函数
    console.log('really')
});
fn();
fn();
fn();