/**
 * 
 * 防反跳。func函数在最后一次调用时刻的wait毫秒之后执行！
 * @param func 执行函数
 * @param wait 时间间隔
 * @param immediate 为true，debounce会在wai 时间间隔的开始调用这个函数
 * @returns {Function}
 */




function debounce(func, wait, immediate) {
    var timeout = null, context, args, result;
    var later = function () {
        timeout = null;
        result = func.apply(context, args);
    }
    return function () {
        context = this;
        args = arguments;
        timeout && clearTimeout(timeout);
        if (immediate) {
            !timeout && (result = func.apply(context, args));
        }
        timeout = setTimeout(later, wait);
        return result;
    }
}

var test = debounce(function (name) {
    console.log(`hello ${name}`);
}, 3000)


var n = 0;
var timer = setInterval(function () {
    if (n >= 10) {
        clearInterval(timer);
    } else {
        test('kel');
        n++;
    }
}, 100);
