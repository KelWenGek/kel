let obj = {
    *[Symbol.iterator]() {
        yield 'hello';
        yield 'world';
    }
}

for (let i of obj) {
    console.log(i);
}