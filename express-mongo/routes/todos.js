// var React = require('react');
// var renderToString = require('react-dom/server');
// var Hello = require('../pages/Hello.js');
var express = require('express');
// var fs = require('fs');
// var path = require('path');
var router = express.Router();
var todoModel = require('../models/todoModel');


/* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource,hello kel');
// });

// router.get('/add', function (req, res, next) {
//     res.render('UserAdd');
// });


// router.get('/welcome', function (req, res) {
//     const html = renderToString(<Hello />);
//     fs.readFile('../views/index', function (err, data) {
//         if (err) { throw err; }
//         const document = data.replace(/<div id="app"><\/div>/, `<div id="app">${html}</div>`);

//         res.send(document);
//     });
// });

router.post('/add', function (req, res, next) {
    var newUser = new todoModel({
        pid: req.body.pid,
        text: req.body.text,
        completed: req.body.completed
    });
    newUser.save(function (err, data) {
        if (err) {
            return console.log(err);
        }
        res.json({
            code: 200,
            msg: '添加成功'
        });
    });
});




router.post('/toggle', function (req, res, next) {
    var id = req.body.id;
    todoModel.findOne({ pid: id }, function (err, data) {
        if (err) { return console.log(err) }
        data.completed = !data.completed;
        data.save(function (err) {
            res.json({
                code: 200,
                msg: '改变成功'
            });
        });
    });
});

router.post('/toggleall', function (req, res, next) {
    var checked = req.body.checked;
    todoModel.find(function (err, data) {
        if (err) { return console.log(err) }
        Promise.all(data.map(m => new Promise(function (resolve, reject) {
            m.completed = checked;
            m.save(function (err) {
                if (err) { reject(err) }
                resolve('success');
            });
        }))).then(function () {
            res.json({
                code: 200,
                msg: '改变成功'
            })
        }).catch(function (err) {
            console.log(err);
        })
    });
});

// router.post('/update', function (req, res, next) {
//   var id = req.body.id;
//   userModel.findById(id, function (err, data) {
//     if (err) { return console.log(err) }
//     data.username = req.body.username;
//     data.email = req.body.email;
//     data.save(function (err) {
//       res.redirect('/users/list');
//     });
//   });
// });

router.post('/del', function (req, res) {
    var id = req.body.id;
    todoModel.remove({ pid: id }, function (err, data) {
        if (err) { return console.log(err); }
        res.json({
            code: 200,
            msg: '删除成功'
        });
    });
});

router.get('/list', function (req, res, next) {
    todoModel.find(function (err, data) {
        if (err) {
            return console.log(err);
        }
        res.json(data);
    });

    // const list = [{ id: 1, text: 'hello kel', completed: false }];
    // res.json(list);
});

module.exports = router;
