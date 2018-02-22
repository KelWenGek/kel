var obj = {
    a: 20,
    getA: function () {
        setTimeout(function ttt() {
            console.log(this.a);
        }.bind(this), 1000)
    }
}
obj.getA()

console.log('this line is for patch');console.log("testing for format-patch")

console.log('hello kel')

console.log('test local origin')
