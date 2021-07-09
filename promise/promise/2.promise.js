let Promise = require('./promise');
let p = new Promise((resolve, reject) => {
    resolve(123);
})

p.then(data => {
    return data
}).then(data => {
    console.log(data);
})