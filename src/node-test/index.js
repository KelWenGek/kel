// var http = require('http');

// http.createServer((req, res) => {
//     console.log(req);
//     res.writeHead(200);
//     res.end(`hello kel`);
// }).listen(3000);

const util = require('util')
const vm = require('vm');
const path = require('path');
const NativeModule = require('module');

function getFunctionContent(fn) {
    return fn.toString().replace(/^function\s?\(\)\s?\{\n?|\n?\}$/g, "").replace(/^\t/mg, "");
}
const m = { exports: {} }
const test = function () {
    console.log('hello kel')
    // console.log(`filename:${__filename}`);
    count += 1;
    // module.exports = { a: 1 };
}
const sandbox = { count: 1 };
let local = 'hyhy';
const code = getFunctionContent(test);
// const wrapper = NativeModule.wrap(code);
// console.log(wrapper);

// const script = new vm.Script(wrapper, {
//     filename: 'a.js',
//     displayErrors: true
// });

// const compiledWrapper = script.runInThisContext();
// console.log(compiledWrapper);
// compiledWrapper.call(m.exports, m.exports, require, m);
// console.log(m);
// console.log(script);
// console.log(code);
const str = `local=\"kel\"`;
console.log(vm.runInNewContext(code, sandbox));

// var vmLocal = vm.runInThisContext(str);
eval(str)
console.log(local);
// console.log(vmLocal);
console.log(util.inspect(sandbox));
let sb;
console.dir(sb = vm.createContext({ count: 2 }));

console.log(vm.isContext(sb));
console.log(vm.isContext({ c: 2 }));


const s = new vm.Script(NativeModule.wrap(`return tt=\"hello world\"`));
console.log(s.runInThisContext().call(null));