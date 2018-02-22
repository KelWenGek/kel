var obj = {
    a: 20,
    getA: function () {
        setTimeout(function ttt() {
            console.log(this.a);
        }.bind(this), 1000)
    }
}
obj.getA()

