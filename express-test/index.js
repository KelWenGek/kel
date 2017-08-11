var express = require('express');
var app = express();

// app.get('/', function (req, res) {
//     res.send('Hello World!');
// });


app.get('/demo', (req, res) => {
    res.status(200);
    res.json({
        a: 1
    });
})

var server = app.listen(3000);




