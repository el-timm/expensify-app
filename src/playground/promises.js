const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            name: 'Tim',
            age: 30
        });
        // reject('something went wrong');
    }, 2500);
});

console.log('before');

promise.then((data) => {
    console.log('1', data);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('This is my other promise');
            // reject('something went wrong');
        }, 2500);
    });
}).then((str) => {
    console.log('does this run?', str);
}).catch((error) => {
    console.log('Error: ' + error)
});

console.log('after');