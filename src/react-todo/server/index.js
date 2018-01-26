var express = require('express');
var path = require('path');
var ejs = require('ejs');

var app = express();

// 新增接口路由
// app.get('/data/:module', function (req, res, next) {
//     var c_path = req.params.module;
//     var Action = require('./server/action/data/' + c_path);
//     Action.execute(req, res);
// });
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// 对所有(/)URL或路由返回index.html 
app.get('/demo', function (req, res) {
    res.status(200);
    res.json({ a: 1 });
    // res.render('index');
});


// 设置views路径和模板
// app.set('views', './client/view');
// app.set('view engine', 'html');
// app.engine('html', ejs.renderFile);

// // app.use配置
// app.use('/client/static', express.static(path.join(__dirname, 'client/static')));

// 启动一个服务，监听从8888端口进入的所有连接请求
var server = app.listen(8888, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://%s:%s', host, port);
}); 