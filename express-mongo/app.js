
var express = require('express');
var path = require('path');
var ejs = require('ejs');
var isDev = process.env.NODE_ENV !== 'production';
var app = express();
var port = 3000;

app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, './views'));

// local variables for all views
app.locals.env = process.env.NODE_ENV || 'dev';
app.locals.reload = true;

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

if (isDev) {

  // static assets served by webpack-dev-middleware & webpack-hot-middleware for development
  var webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackDevConfig = require('./webpack.config.js');

  var compiler = webpack(webpackDevConfig);

  // attach to the compiler & the server
  app.use(webpackDevMiddleware(compiler, {

    // public path should be the same with webpack config
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
      colors: true
    }
  }));
  app.use(webpackHotMiddleware(compiler));

  require('./routes/utils.js')(app);

  // add "reload" to express, see: https://www.npmjs.com/package/reload
  var reload = require('reload');
  var http = require('http');

  var server = http.createServer(app);
  reload(server, app);

  server.listen(port, function () {
    console.log('App (dev) is now running on port 3000!');
  });
} else {

  // static assets served by express.static() for production
  app.use(express.static(path.join(__dirname, '../public')));
  require('./routes/utils.js')(app);
  app.listen(port, function () {
    console.log('App (production) is now running on port 3000!');
  });
}
