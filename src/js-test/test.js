var THIS_IS_CONSTANT = '1';
function git_log_test() {
    console.log('git log search test');
}
var obj = {
    a: 20,
    getA: function () {
        setTimeout(function ttt() {
            console.log(this.a);
        }.bind(this), 1000)
    }
}
obj.getA()

console.log('this line is for patch'); console.log("testing for format-patch")

console.log('hello kel')

console.log('test local origin')

console.log('change for rebase 1');

console.log('change for rebase 2');

console.log('master branch commit B');
